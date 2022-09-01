import FSContainer from "./FSContainer.js";

export default class Products extends FSContainer{
    constructor(file){
        super(newElement);
    }

    async addID(product){
        const content = await this.getAll();
        product.id = content.length + 1;
        product.price = parseInt(product.price);
        return product;
    }

    async getByID(prodID) {
        const content = await this.getAll();
        const location = content.findIndex(obj => obj.id = prodID)
        return content[location]
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
            await fs.promises.writeFile(this.data, JSON.stringify(content));
            return prodToUpdate;
        }else{
            return {error: "not allowed"};
        }
    };

    async deleteByID(prodID){
        if(this.admin){
            const content = await this.getAll();
            const newContent = content.filter(element => element.id != prodID.prodID);
            await fs.promises.writeFile(this.data, JSON.stringify(newContent));
            return console.log("Producto eliminado.");
        }else{
            return {error: "not allowed"};
        }
    };
}