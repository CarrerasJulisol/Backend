import { Router } from "express";
import __dirname from "../utils.js";
import services from '../dao/config.js';

const router = Router();

// GET ALL
router.get('/', async (req,res)=>{
    const get = await services.ProductsServices.getAll();
    res.send(get);
})
//GET BY ID
router.get('/:prodID', async (req,res)=>{
    const { params } = req;
    const getProduct = await services.ProductsServices.getByID(params.prodID);
    if (getProduct){
        res.send(getProduct);
    }else{
        res.status(404).send({status:"error",error:"Producto no encontrado."})
    }
})
// SAVE PRODUCT
router.post('/', async (req, res)=>{
    const { body } = req;
    console.log(body)
    const product = await services.ProductsServices.addID(body)
    const save = await services.ProductsServices.save(product);
    res.send({product: save});
})

// UPDATE PRODUCT
router.put('/:prodID', async (req,res)=>{
    const { params, body } = req;
    const productByID = await services.ProductsServices.getByID(params.prodID);
    const update = await services.ProductsServices.toUpdate(productByID, body);
    res.send({ message: 'actualizado', product: update});
})

// DELETE PRODUCT
router.delete('/:prodID', async (req, res)=>{
    const { params }= req;
    const deleteByID = await services.ProductsServices.deleteByID(params);
    res.send({message: "Producto Eliminado"});
});

export default router;