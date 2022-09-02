import mongoose from 'mongoose';

class MongooseContainer {
    constructor(collection,schema){
        mongoose.connect('mongodb://127.0.0.1/ecommerce')
        this.model = mongoose.model(collection,schema);
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