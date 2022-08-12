import { Router } from "express";
import __dirname from "../utils.js";
import Carts from "../context/Carts.js";
import Products from "../context/Products.js";

const router = Router();
const carts = new Carts;
const products = new Products;
// GET ALL
router.get('/', async(req, res)=>{
    const get = await carts.getAllCarts();
    res.send(get);
})

// GET CART
router.get('/:cartID', async(req, res)=>{
    const { params } = req;
    const getCart = await carts.getCartID(params);
    const cartProducts = [];
    if (getCart){
        res.send(getCart);
    }else{
        res.status(404).send({status:"error",error:"Carrito no encontrado."})
    }
})

// SAVE CART
router.post('/', async(req, res)=>{
    const { body } = req
    const save = await carts.saveCart()
    res.send({cart: save})
})

// SAVE PRODUCTS
router.post('/:cartID/products/:prodID', async (req, res)=>{
    const cartID = req.params.cartID
    const prodID = req.params.prodID
    const { body } = req
    //const cart = await carts.getCartID(params.cartID);
    // deberia recibir un numero
    const product = await products.getByID(prodID);
    const addProduct = await carts.saveProducts(cartID,product);
    res.send({cart: addProduct})
})

// DELETE CART
router.delete('/:cartID', async (req, res)=>{
    const { params } = req;
    await carts.deleteCart(params);
    res.send({message: "Carrito Eliminado"});
})

// DELETE PRODUCT BY ID
router.delete('/:cartID/products/:prodID', async(req,res)=>{
    let cartID = req.params.cartID;
    let prodID = req.params.prodID;
    const cart = await carts.deleteProduct(cartID,prodID)
    res.send({message: "Producto Eliminado"})
})

export default router;