import { Router } from "express";
import __dirname from "../utils.js";
import Products from "../context/Products.js";

const router = Router();
const products = new Products;

// GET ALL
router.get('/', async (req,res)=>{
    const get = await products.getAll();
    res.send(get);
})
//GET BY ID
router.get('/:prodID', async (req,res)=>{
    const { params } = req;
    const getProduct = await products.getByID(params);
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
    const save = await products.saveProduct(body);
    res.send({product: save});
})

// UPDATE PRODUCT
router.put('/:prodID', async (req,res)=>{
    const { params, body } = req;
    const productByID = await products.getByID(params);
    const update = await products.toUpdate(productByID, body);
    res.send({ message: 'actualizado', product: update});
})

router.delete('/:prodID', async (req, res)=>{
    const { params }= req;
    const deleteByID = await products.deleteByID(params);
    res.send({message: "Producto Eliminado"});
});

export default router;