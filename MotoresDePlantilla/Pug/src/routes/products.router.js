import { Router } from "express";
import { uploader } from '../utils.js'
import __dirname from "../utils.js";
import Container from "../context/container.js";

const router = Router()
const File = new Container()

router.post('/',uploader.single('image'),async (req, res)=> {
    const { name, price } = req.body
    let product = {
        name,
        price,
        image: req.file.filename,
    }
    await File.save(product)
    res.send({status:"success",message:"Producto creado."})
})


export default router