import MongoStore from "connect-mongo";
import { Router } from "express";
import __dirname from "../utils.js";
import userService from "../context/users.js";
import session from "express-session";

const router = Router();

router.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://julieta:12345@proyecto-carreras.appkwcp.mongodb.net/test',
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
    const exists = await userService.findOne({email:email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe!"})
    const newUser = {
        name,
        email,
        password
    }
    let result = await userService.create(newUser);
    res.send(result);
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    if(email === "admin" && password === "admin1"){
        req.session.user={
            email,
            role:"admin"
        }
        return res.json({message: "Iniciaste sesion :)"})
    }else{
        res.send({message: "Ups, algun dato que ingresaste es incorrecto."})
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