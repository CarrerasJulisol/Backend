import mongoose from "mongoose";
import User from "../mongoose/models/user.model.js";
import Product from "../mongoose/models/Product.model.js";
import config from "../../config/config.js";

export default class MongooseDao {
    constructor(){
        mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@proyecto-carreras.appkwcp.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`)
        const userSchema = mongoose.Schema(User.schema);
        const productSchema = mongoose.Schema(Product.schema);
        this.models = {
            [User.model] : mongoose.model(User.model,userSchema),
            [Product.model] : mongoose.model(Product.model,productSchema)
        }
    }
    
    isValidModel(entity){
        if (!this.models[entity]) {
            throw new Error('Entity not defined on Mongoose DAOS')
        }
    }

    async getAll(entity){
        this.isValidModel(entity)
        return this.models[entity].find()
    }

    async save(element,entity){
        this.isValidModel(entity)
        return this.models[entity].create(element)
    }
}