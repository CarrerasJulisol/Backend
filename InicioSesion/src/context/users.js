import mongoose from 'mongoose';

const collection = "users";

const usersSchema = new mongoose.Schema({
    name:String,
    email:Object,
    password:String
})

class UserService {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1/ecommerce')
        this.model = mongoose.model(collection,usersSchema);
    }

    async find(email){
        console.log(email)
        return this.model.findOne({email:email})
    }

    async create(newA){
        return this.model.create(newA)
    }
}

export default UserService;