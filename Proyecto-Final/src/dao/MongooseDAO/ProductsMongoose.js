import MongooseContainer from "./MongooseContainer.js";
import mongoose from "mongoose";

const collection ='products';
const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    stock:Number
})

export default class Products extends MongooseContainer{
    constructor(){
        super(collection,productsSchema);
    }
   
    async addID(product){
        // convertir precio a number (no lo puedo cambiar
        // porque en router lo tengo con ese nombre)
        product.price = parseInt(product.price);
        return product;
    }

    async getByID(prodID) {
        const content = await this.model.findOne({_id:prodID})
        return content
    };

    async getByName(prodName) {
        const content = await this.model.findOne({name:prodName})
        return content
    }

    async toUpdate(product,update){
        if(this.admin){
            if (update.name != undefined){
                await this.model.updateOne({_id:product.id},{$set:{name:update.name}})
                console.log('Se actualizó el nombre.');
            }
            if (update.price != undefined){
                await this.model.updateOne({_id:product.id},{$set:{price:update.price}})
                console.log('Se actualizó el precio.');
            }
            if (update.image != undefined){
                await this.model.updateOne({_id:product.id},{$set:{image:update.image}})
                console.log('Se actualizó la imagen.');
            }
            if (update.stock != undefined){
                await this.model.updateOne({_id:product.id},{$set:{stock:update.stock}})
                console.log('Se actualizó el stock.');
            }
            return await this.getByID(product.id)
        }else{
            return {error: "not allowed"};
        }
    };

    async deleteByID(prodID){
        if(this.admin){
            await this.model.deleteOne({_id:prodID.prodID})
            return console.log("Producto eliminado.");
        }else{
            return {error: "not allowed"};
        }
    };

}