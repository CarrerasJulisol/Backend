import { Router } from "express";
import __dirname from "../utils.js";
import Container from "../context/container.js";

const router = Router()
const File = new Container()

router.get('/', async (req, res)=> {
    const allProducts = await File.getAll()
    res.render('products',{
        hasProducts:allProducts.length>0,
        allProducts,
        user:null
    });
})


export default router