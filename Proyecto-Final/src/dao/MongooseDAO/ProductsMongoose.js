import MongooseContainer from "./MongooseContainer.js";
import productsModel from "./models/products.schema.js";

export default class Products extends MongooseContainer{
    constructor(){
        super(productsModel);
    }

    async getByID(prodID) {
        const content = await this.model.findOne({_id:prodID})
        return content
    };

    async getInfo(list){
        return this.model.find({_id:list})
    }

    async getByName(prodName) {
        const content = await this.model.findOne({name:prodName})
        return content
    }
}