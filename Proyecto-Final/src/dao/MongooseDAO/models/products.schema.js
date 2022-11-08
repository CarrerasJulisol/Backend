import mongoose from "mongoose";

const collection ='products';
const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    stock:Number,
    category:String,
    subCategory:String
})

const productsModel = mongoose.model(collection,productsSchema);
export default productsModel;