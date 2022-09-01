import FSContainer from "./FSContainer.js";

export default class Carts extends FSContainer{
    constructor(){
        super(newElement);
    }

    async getCartID(cartID){
        const content = await this.getAll();
        return content.find(element => element.id == cartID);
    }

    async newCart(){
        const cart = {
            id: content.length + 1,
            products: []
        }
        this.save(cart);
        return cart
    }

    async saveProducts(cartID,product){
        let allCarts = await this.getAll();
        const content = await this.getCartID(cartID);
        const exist = content.products.findIndex(obj => obj.id == product.id);
        if (exist !== -1) {
            console.log("exist")
            content.products[exist].quantity++
            const newArray = allCarts.filter(element=>element.id !== content.id)
            allCarts = newArray
            allCarts.push(content)
            await this.data.push(allCarts)
        }else{
            console.log("not exist")
            const prodContainer = {
                quantity: 1,
                id: parseInt(product.id)
            }
            content.products = [...content.products, prodContainer]
            const location = allCarts.findIndex(obj => obj.id == cartID);
            allCarts[location] = content
            await this.data.push(allCarts)
        }
        return content;
    }

    async deleteCart(cartID){
        const content = await this.getAll();
        const newContent = content.filter(element => element.id != cartID.cartID);
        await this.data.push(newContent)
        return console.log('Carrito eliminado.')
    }

    async deleteProduct(cartID, prodID){
        const allCarts = await this.getAll();
        const content = await this.getCartID(cartID);
        const cartContent = content.products.filter(element => element.id != prodID);
        content.products = cartContent
        const newArray = allCarts.filter(element=>element.id != cartID)
        newArray.push(content)
        await this.data.push(newArray)
    }
}