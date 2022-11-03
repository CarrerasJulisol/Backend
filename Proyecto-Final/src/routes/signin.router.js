import { Router } from "express";
import __dirname from "../utils.js";
import Services from "../dao/config.js";
import passport from 'passport';
import { createHash, isValidPassword } from "../utils.js";

const router = Router();
const services = Services;

// LOGIN
router.post('/login',passport.authenticate('login',{failureRedirect:'/account/loginfail'}),async (req, res)=>{
    const { email, password } = req.body;
    if(!email||!password){
        return res.status(400).send({status:"error",error:"Valores incompletos."})
    }
    if(email === "admin" && password === "admin1"){
        req.session.user={
            name:"admin",
            email,
            role:"admin"
        }
        return res.status(200).send({message: "Iniciaste sesion como administrador"}).redirect('http://localhost:8080/home')
    }else{
        let user = await services.UserServices.findEmail(email);
        if (!user) return res.status(400).send({status:"error",error:"Correo incorrecto"})
        if(!isValidPassword(user,password)) return res.status(400).send({status:"error",error:"Contraseña incorrecta"})
        req.session.user={
            name:req.user.name,
            email:req.user.email,
            id:req.user._id,
            role:req.user.role
        }
        res.redirect('http://localhost:8080/home')
    }
})

router.get('/login', async (req, res)=> {
    res.render('login')
})

router.get('/loginfail',(req, res) =>{
    res.status(500).send({status:"error",error:"Error al intentar iniciar sesión."});
})

router.get('/logout', async (req, res)=> {
    req.session.destroy(error=>{
        if(error) return res.send("No se pudo cerrar la sesion. Intenta nuevamente!");
        else return res.send("Tu sesion fue cerrada exitosamente :)");
    })
})

//REGISTER
router.get('/register', (req, res)=> {
    res.render('register')
})

router.post('/register',passport.authenticate('register',{failureRedirect:'/account/registerfail'}),async(req, res)=>{
    const { name, lastName, email, password, street, houseAdd, city, birthday, phone } = req.body;
    const address = {
        street:street,
        houseAdd:houseAdd,
        city:city
    }
    console.log(birthday)
    let date = new Date()
    const anio = date.getFullYear()
    console.log(anio)
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
            role:"client"
        }
        await services.UserServices.createUser(newUser);
        res.send({status:200,message:"Usuario creado con éxito"}).redirect('http://localhost:8080/home');
    }
})

router.get('/registerfail', (req,res)=>{
    res.status(500).send({status:"error",error:"Algo salió mal."})
})

export default router;