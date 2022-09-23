import MongoStore from "connect-mongo";
import { Router } from "express";
import __dirname from "../utils.js";
import { createHash, isValidPassword } from "../utils.js";
import UserService from "../context/users.js";
import Container from "../context/container.mongoose.js";
import passport from 'passport';
import session from "express-session";

const router = Router();
const services = new UserService()

router.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://julieta:12345@proyecto-carreras.appkwcp.mongodb.net/usuarios',
        ttl:1000
    }),
    secret:'th3Sess1onS2',
    resave:false,
    saveUninitialized:false
}))

router.get('/register', async (req, res)=> {
    res.render('register')
})

router.post('/register', async (req, res) =>{
    const { name, email, password } = req.body;
    if(!name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"})
    const exists = await services.find(email)
    if(exists){
        return res.status(400).send({status:"error",error:"El usuario ya existe!"})
    }else{
        const newUser = {
            name,
            email,
            password:createHash(password)
        }
        let result = await services.create(newUser);
        res.send(result);
    }
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    if(!email||!password){
        return res.status(400).send({status:"error",error:"Valores incompletos."})
    }else{
        console.log(email)
        let user = await services.find(email);
        if (!user) return res.status(400).send({status:"error",error:"Credenciales incorrectas."})
        if(!isValidPassword(user,password)) return res.status(400).send({status:"error",error:"Contraseña incorrecta."})
        req.session.user={
            name:user.name,
            email:user.email
        }
        res.json({status:"success",playload:req.session.user})
    }
})

router.get('/login', async (req, res)=> {
    res.render('login')
})

router.get('/logout', async (req, res)=> {
    req.session.destroy(err=>{
        if(err) return res.send("No se pudo cerrar la sesion. Intenta nuevamente!");
        else return res.send("Tu sesion fue cerrada exitosamente :)");
    })
})

router.get('/current', async (req, res)=> {
    if(req.session.user){
        res.send(req.session.user);
    }else{
        res.send("Inicia sesion primero!")
    }
})

export default router