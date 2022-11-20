import services from "../dao/config.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const viewProducts = async(req,res)=>{
    //hay una sesion iniciada?
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    let Session = req.user.id
    const allProducts = await services.ProductsServices.getAll()
    res.render('home',{
        user,
        Session,
        hasProducts:allProducts.length>0,
        allProducts
    });
}

const viewRegister = (req, res)=> {
    res.render('register')
};

const viewLogin = (req, res)=> {
    res.render('login')
};

export default {
    viewProducts,
    viewLogin,
    viewRegister
}