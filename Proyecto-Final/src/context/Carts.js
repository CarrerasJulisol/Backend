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
        console.log(content)
        console.log(content.length)
        const cart = {
            id: content.length + 1,
            products: []
        }
        content.push(cart)
        await fs.promises.writeFile(this.file,JSON.stringify(content));
        return cart
    }

    async saveProducts(cartID,product){
        let allCarts = await this.getAllCarts();
        this.allCarts = allCarts
        const content = await this.getCartID(cartID);
        const exist = content.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            console.log("existe")
            content.products[exist].quantity++
            const newArray = allCarts.filter(element=>element.id !== content.id)
            allCarts = newArray
            allCarts.push(content)
            await fs.promises.writeFile(this.file, JSON.stringify(allCarts))
        }else{
            console.log("no existe")
            const prodContainer = {
                quantity: 1,
                id: parseInt(product.id)
            }
            content.products = [...content.products, prodContainer]
            const location = allCarts.findIndex(obj => obj.id == cartID);
            allCarts[location] = content
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
        console.log("cartID en delete prod")
        console.log(cartID)
        console.log("prodID en delete prod")
        console.log(prodID)
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