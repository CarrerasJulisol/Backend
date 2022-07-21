import { Router } from "express";
import Contenedor from "../context/contenedor.js";

const router = Router()
const File = new Contenedor('src/files/products.txt')

router.get('/', async (req, res)=> {
    const AllProducts = await File.getAll()
    //res.send(AllProducts)
    res.send(JSON.stringify(AllProducts))
    //res.sendFile(AllProducts)
})

router.get('/:id', async (req, res)=> {
    const { params } = req
    const ProdxID = await File.getByID(params)
    if (ProdxID == undefined) {
        return res.status(404).send({status:"error",error:"Producto no encontrado"})
    }else{
        return res.send(JSON.stringify(ProdxID))
    }
})

router.post('/', async (req, res)=> {
    const { body } = req
    const product = await File.save(body)
    res.json({ product: product})
})

router.put('/:id', async (req, res)=> {
    const { params, body } = req
    const ProdxID = await File.getByID(params)
    const update = await File.toUpdate(ProdxID, body)
    res.json({ message: 'put ok', product: update})
})

router.delete('/:id', async (req, res)=> {
    const { params } = req
    const deleteProd = await File.deleteByID(params)
    res.json({message: "Producto Eliminado", product: deleteProd})
})


export default router