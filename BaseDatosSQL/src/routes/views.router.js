import { Router } from "express";
import __dirname from "../utils.js";
import Container from "../context/container.sqlite3.js";

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

// para verificar que todo se guarda bien:
router.get('/api', async (req, res)=> {
    const allProducts = await File.getAll()
    res.send(allProducts);
})

router.get('/chat', async (req, res)=> {
    const chat = await File.getChat()
    res.send(chat);
})


export default router