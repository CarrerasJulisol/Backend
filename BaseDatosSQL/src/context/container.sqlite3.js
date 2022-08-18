import __dirname from "../utils.js";
import database from "../knexServer/db/sqlBase.js";

// CLASE CONTENEDOR //
class Container {
    constructor() {
        this.products = []
        this.messages = []
    }

    async save(newObj) {
        try {
            // leo el archivo
            const read = await this.getAll();
            // guardo el archivo
            await database('products').insert(newObj)
            return newObj
        } catch (error) {
            return console.log(`Hubo un error: ${error}`)
        }
    }

    async getByID(id) {
        try {
            // leo el archivo
            const read = await this.getAll();
            // busco el objeto con ese ID
            const object = read.find(elem => elem.id == id.id)
            return object
        } catch (error) {
            console.log(`Hubo un error, no se encontró el elemento por ID. Error: ${error}`)
        }
    }

    async getAll() {
        try {
            // leo el archivo
            const read = await database('products').select('*')
            return read
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }

    async deleteByID(id) {
        try {
            // leo el archivo
            const product = await this.getByID(id)
            // elimino el elemento a eliminar
            await database('products').delete(product)
            return console.log('Objeto eliminado')
        } catch (error) {
            console.log(`Ups, hubo un error. Error: ${error}`)
        }
    }

    async deleteAll() {
        try {
            const ArrayVacio = []
            // guardo un nuevo array vacio para borrar todo
            await database('products').delete('*')
        } catch (error) {
            console.log(`Hubo un error, no se pudo escribir el archivo. Error: ${error}`)
        }
    }

    
    async getRandom() {
        const read = await this.getAll();
        const num = Math.floor(Math.random()*read.length)
        return await read[num]
    }

    async toUpdate(product, update){
        const read = await this.getAll();
        const location = read.findIndex(obj => obj.id == product.id)
        //verifico si se quiere cambiar el nombre
        if (update.name != undefined){
            read[location].name = update.name
            console.log('se actualizó el nombre')
        }
        //verifico si se quiere cambiar el precio
        if (update.price != undefined){
            read[location].price = parseInt(update.price)
            console.log('se actualizó el precio')
        }
        //verifico si se quiere cambiar la imagen
        if (update.image != undefined){
            read[location].image = update.image
            console.log('se actualizó la img')
        }
        // guardo las actualizaciones en el archivo
        await database('products').update(read[location])
        // retorno el producto actualizado para mostrarlo
        return read[location]
    }

    /* CHAT */
    async saveChat(messages) {
        try {
            await database('chat').insert(messages)
            return messages
        } catch (error) {
            return console.log(`Hubo un error: ${error}`)
        }
    }

    async getChat() {
        try {
            const archivo = await database('chat').select('*')
            // leo el archivo
            return archivo
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }
}

export default Container;
