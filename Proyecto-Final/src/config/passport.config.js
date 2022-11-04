import passport from "passport";
import local from 'passport-local';
import services from "../dao/config.js";
import { createHash, isValidPassword, uploader } from "../utils.js";

const LocalStrategy = local.Strategy;
const service = services;
//const Uploader = uploader

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email"},
    async (req, email, password, done)=>{
        try{
            const { name, lastName, street, houseAdd, city, birthday, phone } = req.body;
            const address = {
                street:street,
                houseAdd:houseAdd,
                city:city
            }
            if(!name||!lastName||!email||!password||!street||!houseAdd||!city||!birthday||!phone) return done(null,false,{message:"Valores incompletos"});
            //verificamos si el usuario existe
            const exists = await service.UserServices.findEmail(email);
            if(exists) return done(null,false,{message:"El usuario ya existe"});
            //lo guardamos en la base
            const newUser = {
                name,
                lastName,
                email,
                password:createHash(password),
                address:address,
                birthday,
                phone,
                //image:req.file.filename,
                role:"client"
            }
            let result = await service.UserServices.createUser(newUser);
            return done(null,result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'},async(email, password, done)=>{
        if(!email||!password) return done(null,false,{message:"Valores incompletos"});
        let user = await service.UserServices.findEmail(email);
        if(!user||!"admin") return done(null,false,{message:"El usuario no existe"});
        if(!isValidPassword(user, password)) return done(null,false,{message:"La contraseña es incorrecta."});
        return done(null,user);
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await service.UserServices.findID(id)
        return done(null,result);
    })
}

export default initializePassport;