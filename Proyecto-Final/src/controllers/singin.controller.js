import services from '../dao/config.js';
import { isValidPassword, createHash, uploader } from '../utils.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const login = async(req,res)=>{
    const { email, password } = req.body;
    if(!email||!password){
        return res.status(400).send({status:"error",error:"Valores incompletos."})
    }
    if((email===config.session.ADMIN_EMAIL)&(password===config.session.ADMIN_PWD)){
        const adminUser = {
            name:"Admin",
            role:'admin',
            id:0
        }
        const token = jwt.sign(adminUser,config.jwt.SECRET,{expiresIn:'1h'});
        return res.cookie(config.jwt.COOKIE,token,{maxAge:3600000}).send({status:"success",message:'Logueado como administrador.'})
    }else{
        let user = await services.UserServices.findEmail(email);
        if (!user) return res.status(400).send({status:"error",error:"Correo incorrecto"})
        if(!isValidPassword(user,password)) return res.status(400).send({status:"error",error:"Contraseña incorrecta"})
        const tokenUser = {
            email:user.email,
            role:user.role,
            name:`${user.name} ${user.lastName}`,
            cart:user.cartID,
            id:user._id
        }
        const token = jwt.sign(tokenUser,config.jwt.SECRET,{expiresIn:'1h'});
        res.cookie(config.jwt.COOKIE,token,{maxAge:3600000}).status(200).send({message: "Iniciaste sesion"})
    }
}

const loginFail = (req, res) =>{
    res.status(500).send({status:"error",error:"Error al intentar iniciar sesión."});
}

const logout = (req, res)=> {
    req.session.destroy(error=>{
        if(error) return res.send("No se pudo cerrar la sesion. Intenta nuevamente!");
        else return res.render('logout');
    })
}

const register = async(req,res)=>{
    const { name, lastName, email, password, street, houseAdd, city, birthday, phone, image } = req.body;
    const address = {
        street:street,
        houseAdd:houseAdd,
        city:city
    }
    if(!name||!lastName||!email||!password||!street||!houseAdd||!city||!phone) return res.status(400).send({status:"error",error:"Valores incompletossss"})
    const exists = await services.UserServices.findEmail(email)
    if(exists){
        console.log("Ya existe un usuario registrado con el correo ingresado.")
    }else{
        const newUser = {
            name,
            lastName,
            email,
            password:createHash(password),
            address:address,
            birthday,
            phone,
            //image:req.file.filename,
            role:'user'
        }
        await services.UserServices.createUser(newUser);
        let user = await services.UserServices.findEmail(email);
        let cart = await services.CartsServices.newCart(user.id)
        await services.CartsServices.addCartID(user.id,cart.id)
        res.status(200).send({message:"Usuario creado con éxito"})
    }
}

const registerFail = async(req,res)=>{
    res.status(500).send({status:"error",error:"Algo salió mal."})
}

export default {
    login,
    loginFail,
    register,
    registerFail,
    logout
}