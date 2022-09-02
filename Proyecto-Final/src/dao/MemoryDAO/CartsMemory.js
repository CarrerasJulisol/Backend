import MemoryContainer from "./MemoryContainer.js";

export default class Carts extends MemoryContainer{
    constructor(){
        super();
        this.carts = []
    }

    async getAllCarts(){
        return this.carts
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
        this.carts.push(cart);
        return cart
    }

    async saveProducts(cartID,product){
        let allCarts = await this.getAllCarts();
        console.log(allCarts)
        const content = await this.getCartID(cartID);
        console.log(content)
        const exist = content.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            console.log("exist")
            content.products[exist].quantity++
            const newArray = allCarts.filter(element=>element.id !== content.id)
            allCarts = newArray
            allCarts.push(content)
            this.carts = allCarts
        }else{
            console.log("not exist")
            const prodContainer = {
                quantity: 1,
                id: parseInt(product.id)
            }
            content.products = [...content.products, prodContainer]
            console.log(content)
            const location = allCarts.findIndex(obj => obj.id == cartID);
            console.log(location)
            allCarts[location] = content
            console.log(allCarts)
            this.carts = allCarts
        }
        return content;
    }

    async deleteCart(cartID){
        const content = await this.getAllCarts();
        const newContent = content.filter(element => element.id != cartID.cartID);
        this.carts = newContent
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const allCarts = await this.getAllCarts();
        const content = await this.getCartID(cartID);
        const cartContent = content.products.filter(element => element.id != prodID);
        content.products = cartContent
        const newArray = allCarts.filter(element=>element.id != cartID)
        newArray.push(content)
        this.carts = newArray
    }
}