import mongoose from 'mongoose';
import config from '../../config/config.js';

class MongooseContainer {
    constructor(model){
        mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@proyecto-carreras.appkwcp.mongodb.net/${config.mongo.DB}`)
        this.model = model;
        this.admin = true;
    }

    async getAll(){
        return this.model.find();
    };

    async save(document){
        return this.model.create(document);
    }
}

export default MongooseContainer;