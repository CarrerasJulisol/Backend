import mongoose from 'mongoose';

const collection = "users";
const usersSchema = mongoose.Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    address:Object,
    birthday:String,
    age:Number,
    phone:Number,
    role: {
        type:String,
        enum: ['user', 'admin'],
        default:'user'
    },
    cartID:String
})

const userModel = mongoose.model(collection,usersSchema);
export default userModel;