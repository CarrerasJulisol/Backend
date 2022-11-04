import MongooseContainer from "./MongooseContainer.js";
import mongoose from "mongoose";

const collection ='carts';
const cartsSchema = mongoose.Schema({
    idUser:String,
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
        return this.model.findOne({idUser:cartID})
    }

    async addToCart(id,newContent){
        console.log("newContent",newContent)
        console.log("id",id)
        const cart = await this.getCartID(id)
        console.log("cart",cart)
        const cartContent = cart.products;
        console.log("cartContent",cartContent)
        newContent.forEach(element => {
            const exist = cartContent.findIndex(prod=> prod.id == element.id)
            if(exist!==-1){
                cartContent[exist].quantity++
            }else{
                cartContent.push(element)
            }
        });
        console.log("cartContent",cartContent)
        await this.model.updateOne({_id:cart._id},{$set:{products:cartContent}})

    }

    async newCart(userID){
        const cart = {
            idUser:userID,
            products:[]
        }
        return this.save(cart);
    }

    async saveProducts(cartID,product){
        const cart = await this.getCartID(cartID);
        const exist = cart.products.findIndex(obj => obj.id == product);
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

    async deleteAllinCart(cartID){
        await this.model.deleteOne({_id:cartID})
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const cart = await this.getCartID(cartID);
        const cartContent = await cart.products.filter(element => element.id !== prodID[0]);
        console.log("cartContent",cartContent)
        return this.model.updateOne(cart,{$set:{products:cartContent}})
    }
}