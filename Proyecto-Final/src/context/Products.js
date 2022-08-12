import __dirname from "../utils.js";
import fs from 'fs';

class Products {
    constructor(){
        this.file = __dirname+'/files/products.json';
        this.allProducts = [];
        this.admin = true;
    };

    async getAll(){
        const read = await fs.promises.readFile(this.file, 'utf-8');
        return JSON.parse(read);
    };

    async getByID(prodID) {
        const content = await this.getAll();
        const location = content.findIndex(obj => obj.id == prodID)
        return content[location]
    };

    async saveProduct(newProduct){
        if (this.admin) {
            const content = await this.getAll();
            newProduct.id = content.length + 1;
            newProduct.price = parseInt(newProduct.price);
            this.allProducts = content;
            await fs.promises.writeFile(this.file, JSON.stringify(this.allProducts));
            return newProduct;
        }else{
            return {error: "not allowed"};
        }
    };

    async toUpdate(product,update){
        if(this.admin){
            const content = await this.getAll();
            const prodToUpdate = content.find(element=> element.id === product.id);
            if (update.name != undefined){
                prodToUpdate.name = update.name;
                console.log('Se actualizó el nombre.');
            }
            if (update.price != undefined){
                prodToUpdate.price = update.price;
                console.log('Se actualizó el precio.');
            }
            if (update.thumbnail != undefined){
                prodToUpdate.thumbnail = update.thumbnail;
                console.log('Se actualizó la imagen.');
            }
            await fs.promises.writeFile(this.file, JSON.stringify(content));
            return prodToUpdate;
        }else{
            return {error: "not allowed"};
        }
    };

    async deleteByID(prodID){
        if(this.admin){
            const content = await this.getAll();
            const newContent = content.filter(element => element.id != prodID.prodID);
            this.allProducts = newContent;
            await fs.promises.writeFile(this.file, JSON.stringify(this.allProducts));
            return console.log("Producto eliminado.");
        }else{
            return {error: "not allowed"};
        }
    };
};

export default Products;