import mongoose, { Schema } from 'mongoose';
import config from '../../config/config.js';
import { normalize, schema } from 'normalizr';

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

    async getNormalizr(entity){
        const data = await this.getAll();
        let schemaEntity = new schema.Entity(entity)
        const normalizedData = normalize(data,schemaEntity);
        return normalizedData
    }
}

export default MongooseContainer;