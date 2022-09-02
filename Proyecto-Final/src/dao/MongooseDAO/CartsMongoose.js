import MongooseContainer from "./MongooseContainer.js";
import mongoose from "mongoose";

const collection ='carts';
const cartsSchema = mongoose.Schema({
    products:{type:Array}
},{timestamps:true})

export default class Carts extends MongooseContainer{
    constructor(){
        super(collection,cartsSchema);
    }

    async getAllCarts(){
        return this.model.find()
    }

    async getCartID(cartID){
        return this.model.findOne({_id:cartID})
    }

    async newCart(){
        const cart = {
            products: []
        }
        this.save(cart);
        return cart
    }

    async saveProducts(cartID,product){
        const cart = await this.getCartID(cartID);
        const exist = cart.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            console.log("exist")
            cart.products[exist].quantity++
            await this.model.updateOne({_id:cartID},{$set:{products:cart.products}})
        }else{
            console.log("not exist")
            const prodContainer = {
                quantity: 1,
                id: parseInt(product.id)
            }
            cart.products.push(prodContainer)
            await this.model.updateOne({_id:cartID},{$set:{products:cart.products}})
        }
        return cart;
    }

    async deleteCart(cartID){
        await this.model.deleteOne({_id:cartID})
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const cart = await this.getCartID(cartID);
        const cartContent = await cart.products.filter(element => element.id != prodID);
        await this.model.updateOne({_id:cartID},{$set:{products:cartContent}})
    }
}