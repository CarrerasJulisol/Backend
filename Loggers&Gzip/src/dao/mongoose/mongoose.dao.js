import mongoose from "mongoose";
import User from "../mongoose/models/user.model.js";
import config from "../../config/config.js";

export default class MongooseDao {
    constructor(model){
        this.mongoose = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@proyecto-carreras.appkwcp.mongodb.net/${config.mongo.DB}`)
        const userSchema = mongoose.Schema(User.schema);
        this.models = {
            [User.model] : mongoose.model(User.model,userSchema)
        }
    }
    
    isValidModel(entity){
        if (!this.models[entity]) {
            throw new Error('Entity not defined on Mongoose DAOS')
        }
    }

    async getAll(entity){
        this.isValidEntity(entity)
        return this.model[entity].find()
    }

    async save(element,entity){
        console.log("element",element)
        this.isValidEntity(entity)
        return this.model[entity].create(element)
    }
}