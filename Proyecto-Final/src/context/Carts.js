import __dirname from "../utils.js";
import fs from 'fs';

class Carts {
    constructor() {
        this.file = __dirname+'/files/carts.json';
        this.allCarts = [];
    }

    async getAllCarts(){
        const read = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(read);
    }

    async getCartID(cartID){
        const content = await this.getAllCarts();
        return content.find(element => element.id == cartID);
    }

    async saveCart(){
        const content = await this.getAllCarts();
        console.log(content.length)
        const cart = {
            id: content.length,
            products: []
        }
        content.push(cart)
        await fs.promises.writeFile(this.file,JSON.stringify(content));
        return cart
    }

    async saveProducts(cartID,product){
        let allCarts = await this.getAllCarts();
        const content = await this.getCartID(cartID);
        const exist = content.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            content.products[exist].quantity++
            const newArray = allCarts.filter(element=>element.id !== content.id)
            allCarts = newArray
            allCarts.push(content)
            await fs.promises.writeFile(this.file, JSON.stringify(allCarts))
        }else{
            const prodContainer = {
                quantity: 1,
                id: product.id
            }
            content.products.push(prodContainer);
            this.allCarts.push(content)
            await fs.promises.writeFile(this.file, JSON.stringify(this.allCarts));
        }
        return content;
    }

    async deleteCart(cartID){
        const content = await this.getAllCarts();
        const newContent = content.filter(element => element.id != cartID.cartID);
        this.allCarts = newContent;
        await fs.promises.writeFile(this.file, JSON.stringify(this.allCarts));
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const allCarts = await this.getAllCarts();
        const content = await this.getCartID(cartID);
        const cartContent = content.products.filter(element => element.id != prodID);
        content.products = cartContent
        this.allCarts = allCarts
        const newArray = allCarts.filter(element=>element.id != cartID)
        newArray.push(content)
        this.allCarts = newArray
        await fs.promises.writeFile(this.file, JSON.stringify(this.allCarts));
    }
};

export default Carts;