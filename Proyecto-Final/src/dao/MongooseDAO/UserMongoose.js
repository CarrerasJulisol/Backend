import mongoose from 'mongoose';
import MongooseContainer from './MongooseContainer.js';

const collection = "users";

const usersSchema = new mongoose.Schema({
    name:String,
    lastName:String,
    email:Object,
    password:String,
    address:Object,
    birthday:String,
    age:Number,
    phone:Number,
    role:String
})

export default class UserService extends MongooseContainer{
    constructor(){
        super(collection,usersSchema);
    }

    async findEmail(email){
        return this.model.findOne({email:email})
    }

    async createUser(newA){
        return this.model.create(newA)
    }

    async findID(id){
        return this.model.findOne({_id:id})
    }
}