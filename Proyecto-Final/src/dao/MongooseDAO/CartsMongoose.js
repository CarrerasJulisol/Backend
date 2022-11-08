import MongooseContainer from "./MongooseContainer.js";
import cartsModel from "./models/carts.schema.js";

export default class Carts extends MongooseContainer{
    constructor(){
        super(cartsModel);
    }

    async getAllCarts(){
        return this.model.find()
    }

    async getCartID(id){
        return this.model.findOne({_id:id}).lean();
    }

    async newCart(userID){
        const cart = {
            cart:[],
            userID
        }
        return this.save(cart);
    }

    async update (id,cart){
        const before = await this.getCartID({_id:id})
        if(cart.length>0){
            cart.forEach(element => {
                before.cart.push(element)
            });
        }
        return this.model.findByIdAndUpdate({_id:id},{$set:{cart:before.cart}})
    }

    async deleteAllinCart(cartID){
        await this.model.deleteOne({_id:cartID})
        return console.log('Carrito eliminado.')
    }

    async delete(id,product){
        const cart = await this.getCartID({_id:id})
        const allinCart = cart.cart
        const newList = allinCart.filter(element => element.product != product[0]);
        return this.model.findByIdAndUpdate({_id:cart._id},{$set:{cart:newList}});
    }
}