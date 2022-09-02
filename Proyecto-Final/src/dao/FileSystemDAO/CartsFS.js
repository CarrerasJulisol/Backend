import FSContainer from "./FSContainer.js";
import fs from 'fs';
import __dirname from "../../utils.js";

export default class Carts extends FSContainer{
    constructor(file){
        super(file);
        this.file = __dirname+"/files/carts.json"
    }

    async getAllCarts(){
        const read = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(read);
    }

    async getCartID(cartID){
        const content = await this.getAllCarts();
        return content.find(element => element.id == cartID);
    }

    async newCart(){
        const content = await this.getAllCarts();
        const cart = {
            id: content.length + 1,
            products: []
        }
        await fs.promises.writeFile(this.file, JSON.stringify(content));
        return cart
    }

    async saveProducts(cartID,product){
        let allCarts = await this.getAllCarts();
        const content = await this.getCartID(cartID);
        const exist = content.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            console.log("exist")
            content.products[exist].quantity++
            const newArray = allCarts.filter(element=>element.id !== content.id)
            allCarts = newArray
            allCarts.push(content)
            await fs.promises.writeFile(this.file, JSON.stringify(allCarts))
        }else{
            console.log("not exist")
            const prodContainer = {
                quantity: 1,
                id: parseInt(product.id)
            }
            content.products = [...content.products, prodContainer]
            const location = allCarts.findIndex(obj => obj.id == cartID);
            allCarts[location] = content
            await fs.promises.writeFile(this.file, JSON.stringify(allCarts));
        }
        return content;
    }

    async deleteCart(cartID){
        const content = await this.getAllCarts();
        const newContent = content.filter(element => element.id != cartID.cartID);
        await fs.promises.writeFile(this.file, JSON.stringify(newContent));
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const allCarts = await this.getAllCarts();
        const content = await this.getCartID(cartID);
        const cartContent = content.products.filter(element => element.id != prodID);
        content.products = cartContent
        const newArray = allCarts.filter(element=>element.id != cartID)
        newArray.push(content)
        await fs.promises.writeFile(this.file, JSON.stringify(newArray));
    }
}