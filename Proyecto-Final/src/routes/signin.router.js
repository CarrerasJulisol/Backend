import { Router } from "express";
import __dirname from "../utils.js";
import Services from "../dao/config.js";
import passport from 'passport';
import userController from "../controllers/singin.controller.js";
import viewsController from "../controllers/views.controller.js";
import { publicValidation } from "../middlewares/auth.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

const router = Router();
const services = Services;


// LOGIN
router.post('/login',publicValidation,passport.authenticate('login',{failureRedirect:'/account/loginfail'}),userController.login);

router.get('/login',publicValidation,viewsController.viewLogin);

router.get('/loginfail',publicValidation,userController.loginFail);

// LOGOUT
router.get('/logout',userController.logout);

//REGISTER
router.get('/register',publicValidation,viewsController.viewRegister);

router.post('/register',publicValidation,/*uploader.single('image'),*/passport.authenticate('register',{failureRedirect:'/account/registerfail'}),userController.register);

router.get('/registerfail',publicValidation,userController.registerFail);

router.get('/current', async (req, res)=> {
    if(req.cookies[config.jwt.COOKIE]){
        const token = req.cookies[config.jwt.COOKIE];
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send(user);
    }else{
        res.send("Inicia sesion primero!")
    }
})

export default router;