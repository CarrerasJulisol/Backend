import services from '../dao/config.js';
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const myCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    if(!user){
        return res.render('pleaseLogin');
    }else{
        let myCartID = user.cart
        let userID = user.id
        //existe el carrito?
        const cart = await services.CartsServices.getCartID(myCartID)
        // hay productos?
        const newList = [];
        if(cart.cart.length>=1){
            cart.cart.forEach(element => {
                newList.push(element.product)
            });
        }
        // buscar info de los productos
        const addedProducts = await services.ProductsServices.getInfo(newList);
        res.render('myCart',{
            addedProducts
        })
    }
};

const saveAtCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    let myCartID = user.cart
    // data
    let data = req.body
    services.CartsServices.update(myCartID,data)
    data = [];
    res.send({message:"guardado", data})
}

const removeFromCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    let myCartID = user.cart
    // data
    let data = req.body
    console.log("data",data)
    services.CartsServices.delete(myCartID,data)
    data = [];
    res.send({message:"eliminado", data})
}

export default {
    myCart,
    saveAtCart,
    removeFromCart
}