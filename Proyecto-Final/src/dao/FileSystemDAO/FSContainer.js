import __dirname from "../../utils.js";
import fs from 'fs';

class FSContainer {
    constructor(){
        this.data = __dirname+"/files/products.json";
        this.admin = true;
    };

    async getAll(){
        console.log(this.data)
        const read = await fs.promises.readFile(this.data, 'utf-8');
        return JSON.parse(read);
    };
    
    async save(newElement){
        if (this.admin) {
            console.log(newElement)
            const content = await this.getAll();
            content.push(newElement)
            await fs.promises.writeFile(this.data, JSON.stringify(content));
            return newElement;
        }else{
            return {error: "not allowed"};
        }
    };
};



export default FSContainer;