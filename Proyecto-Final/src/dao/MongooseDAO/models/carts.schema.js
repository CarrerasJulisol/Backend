import mongoose from "mongoose";

const collection ='carts';
const cartsSchema = mongoose.Schema({
    cart: [
        {
            
            product:String,
            quantity:{
                type:Number,
                default:1
            }
            
        }
    ],
    userID:String,
})

const cartsModel = mongoose.model(collection,cartsSchema);
export default cartsModel;