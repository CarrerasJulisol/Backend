import services from '../dao/config.js';
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import winston from 'winston';

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.Console({level:'warn'}),
        new winston.transports.Console({level:'error'})
    ]
})

const myCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    if(!user){
        logger.log('warn', 'no se encontro un usuario')
        return res.render('pleaseLogin');
    }else{
        let myCartID = user.cart
        logger.log('info','myCartID '+ myCartID)
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
    logger.log('info','data'+data)
    services.CartsServices.delete(myCartID,data)
    data = [];
    res.send({message:"eliminado", data})
}

export default {
    myCart,
    saveAtCart,
    removeFromCart
}