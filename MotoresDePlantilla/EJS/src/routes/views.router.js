import { Router } from "express";
import __dirname from "../utils.js";
import Container from "../context/container.js";

const router = Router()
const File = new Container()

router.get('/productos', async (req, res)=> {
    const allProducts = await File.getAll()
    res.render('products',{
        hasProducts:allProducts.length>0,
        allProducts
    })
})

router.get('/agregar', (req, res)=> {
    res.render('newProduct')
})

export default router