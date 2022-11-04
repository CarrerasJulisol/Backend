import { Router } from "express";
import services from '../dao/config.js';

const router = new Router();

router.get('/',async(req,res)=>{
    //hay una sesion iniciada?
    let Session = req.session.user
    const allProducts = await services.ProductsServices.getAll()
    res.render('home',{
        Session,
        hasProducts:allProducts.length>0,
        allProducts
    });
})

export default router;