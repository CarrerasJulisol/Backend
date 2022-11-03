import mongoose from 'mongoose';

class MongooseContainer {
    constructor(collection,schema){
        mongoose.connect('mongodb+srv://julieta:12345@proyecto-carreras.appkwcp.mongodb.net/Base001?retryWrites=true&w=majority')
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