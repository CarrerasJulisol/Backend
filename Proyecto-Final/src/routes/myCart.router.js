import { Router } from "express";
import services from "../dao/config.js";

const router = Router();

router.get('/',async(req,res)=>{
    if(!req.session.user){
        return res.render('pleaseLogin');
    }else{
        let myCartID = req.session.user.id
        //existe el carrito?
        const cart = await services.CartsServices.getCartID(myCartID)
        if(!cart) return services.CartsServices.newCart(myCartID)
        // hay productos?
        const list = cart.products
        const newList = [];
        list.forEach(element => {
            newList.push(element.id)
        });
        // buscar info de los productos
        const addedProducts = await services.ProductsServices.getInfo(newList);
        //console.log(addedProducts)
        res.render('myCart',{
            cart,
            addedProducts
        })
    }
})

router.post('/',async(req,res)=>{
    // data
    let data = req.body
    console.log("data",data)
    if(data[0]==="remove"){
        const toDelete = data.filter(element => element !== "remove")
        services.CartsServices.deleteProduct(req.session.user.id,toDelete)
        res.redirect('/myCart')
    }else{
        services.CartsServices.addToCart(req.session.user.id,data)
        data = [];
        res.send({message:"mp se si funciona", data})
    }
})

/*
router.get('/agregarproductos',async(req,res)=>{
    let result = productos.forEach(producto=>{
        return services.ProductsServices.save(producto)
    })
    res.send(result)
})
*/

export default router;