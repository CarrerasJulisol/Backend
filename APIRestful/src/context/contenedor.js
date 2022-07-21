import fs from 'fs'

// CLASE CONTENEDOR //
class Container {
    constructor(route) {
        this.file = route
        this.products = []
    }

    async save(newObj) {
        try {
            // leo el archivo
            const read = await fs.promises.readFile(this.file, 'utf-8')
            const contents = JSON.parse(read)
            // le asigno un id
            newObj.id = contents.length + 1
            // convierto el valor de precio a number
            newObj.price = parseInt(newObj.price)
            // guardo el nuevo objeto en el array
            contents.push(newObj)
            this.products = contents
            // guardo el archivo
            await fs.promises.writeFile(this.file, JSON.stringify(this.products))
            return newObj
        } catch (error) {
            return console.log(`Hubo un error: ${error}`)
        }
    }

    async getByID(id) {
        try {
            // leo el archivo
            const read = await fs.promises.readFile(this.file, 'utf-8')
            const contents = JSON.parse(read)
            // busco el objeto con ese ID
            const object = contents.find(elem => elem.id == id.id)
            return object
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }

    async getAll() {
        try {
            // leo el archivo
            const read = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(read)
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }

    async deleteByID(id) {
        try {
            // leo el archivo
            const read = await fs.promises.readFile(this.file, 'utf-8')
            const contents = JSON.parse(read)
            // creo un nuevo array con todos los elementos excepto el que quiero eliminar
            const nuevoArray = contents.filter(elem => elem.id !== id)
            // guardo el nuevo array
            await fs.promises.writeFile(this.file, nuevoArray)
            return console.log('Objeto eliminado')
        } catch (error) {
            console.log(`Ups, hubo un error. Error: ${error}`)
        }
    }

    async deleteAll() {
        try {
            const ArrayVacio = []
            // guardo un nuevo array vacio para borrar todo
            await fs.promises.writeFile(this.file, ArrayVacio)
        } catch (error) {
            console.log(`Hubo un error, no se pudo escribir el archivo. Error: ${error}`)
        }
    }

    
    async getRandom() {
        const read = await fs.promises.readFile(this.file, 'utf-8')
        const contents = JSON.parse(read)
        const num = Math.floor(Math.random()*contents.length)
        const random = contents[num]
        const result = JSON.stringify(random)
        return await result
    }

    async toUpdate(product, update){
        const read = await fs.promises.readFile(this.file, 'utf-8')
        const contents = JSON.parse(read)
        const location = contents.findIndex(obj => obj.id == product.id)
        //verifico si se quiere cambiar el nombre
        if (update.name != undefined){
            contents[location].name = update.name
            console.log('se actualizó el nombre')
        }
        //verifico si se quiere cambiar el precio
        if (update.price != undefined){
            contents[location].price = parseInt(update.price)
            console.log('se actualizó el precio')
        }
        //verifico si se quiere cambiar la imagen
        if (update.thumbnail != undefined){
            contents[location].thumbnail = update.thumbnail
            console.log('se actualizó la img')
        }
        // guardo las actualizaciones en el archivo
        await fs.promises.writeFile(this.file, JSON.stringify(contents))
        // retorno el producto actualizado para mostrarlo
        return contents[location]
    }
}

export default Container;
