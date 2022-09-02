import { Router } from "express";
import __dirname from "../utils.js";
import services from '../dao/config.js';

const router = Router();

// GET ALL
router.get('/', async(req, res)=>{
    const get = await services.CartsServices.getAllCarts();
    res.send(get);
})

// GET CART
router.get('/:cartID', async(req, res)=>{
    const { params } = req;
    const getCart = await services.CartsServices.getCartID(params.cartID);
    if (getCart){
        res.send(getCart);
    }else{
        res.status(404).send({status:"error",error:"Carrito no encontrado."})
    }
})

// SAVE CART
router.post('/', async(req, res)=>{
    const save = await services.CartsServices.newCart()
    res.send({cart: save})
})

// SAVE PRODUCTS
router.post('/:cartID/products/:prodID', async (req, res)=>{
    const cartID = req.params.cartID
    const prodID = req.params.prodID
    const { body } = req
    console.log(prodID)
    //const cart = await services.CartsServices.getCartID(params.cartID);
    // deberia recibir un numero
    const product = await services.ProductsServices.getByID(prodID);
    const addProduct = await services.CartsServices.saveProducts(cartID,product);
    res.send({cart: addProduct})
})

// DELETE CART
router.delete('/:cartID', async (req, res)=>{
    const { params } = req;
    await services.CartsServices.deleteCart(params);
    res.send({message: "Carrito Eliminado"});
})

// DELETE PRODUCT BY ID
router.delete('/:cartID/products/:prodID', async(req,res)=>{
    let cartID = req.params.cartID;
    let prodID = req.params.prodID;
    const cart = await services.CartsServices.deleteProduct(cartID,prodID)
    res.send({message: "Producto Eliminado"})
})

export default router;