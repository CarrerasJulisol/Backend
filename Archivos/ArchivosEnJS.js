const fs = require('fs')

class Contenedor {
    constructor(ruta) {
        this.archivo = ruta
        this.productos = []
    }

    async save(nuevoObj) {
        try {
            // leo el archivo
            const leer = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenido = JSON.parse(leer)
            // le asigno un id
            nuevoObj.id = contenido.length + 1
            // guardo el nuevo objeto en el array
            contenido.push(nuevoObj)
            this.productos = contenido
            // guardo el archivo
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos))
            return nuevoObj.id
        } catch (error) {
            return console.log(`Hubo un error: ${error}`)
        }
    }

    async getByID(id) {
        try {
            // leo el archivo
            const leer = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenido = JSON.parse(leer)
            // busco el objeto con ese ID
            const objeto = contenido.find(elem => elem.id === id)
            return console.log(objeto)
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }

    async getAll() {
        try {
            // leo el archivo
            const leer = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(leer)
        } catch (error) {
            console.log(`Hubo un error, no se pudo leer el archivo. Error: ${error}`)
        }
    }

    async deleteByID(id) {
        try {
            // leo el archivo
            const leer = await fs.promises.readFile(this.archivo, 'utf-8')
            const contenido = JSON.parse(leer)
            // creo un nuevo array con todos los elementos excepto el que quiero eliminar
            const nuevoArray = contenido.filter(elem => elem.id !== id)
            // guardo el nuevo array
            await fs.promises.writeFile(this.archivo, nuevoArray)
            return console.log('Objeto eliminado')
        } catch (error) {
            console.log(`Ups, hubo un error. Error: ${error}`)
        }
    }

    async deleteAll() {
        try {
            const ArrayVacio = []
            // guardo un nuevo array vacio para borrar todo
            await fs.promises.writeFile(this.archivo, ArrayVacio)
        } catch (error) {
            console.log(`Hubo un error, no se pudo escribir el archivo. Error: ${error}`)
        }
    }
}

// Objetos para agregar al archivo:
const buzo = {
    title: 'Buzo combinado',
    price: 3675,
    thumbnail: 'https://ibb.co/m4BpNkH'
}

const vestido = {
    title: 'Vestido rosado',
    price: 3255,
    thumbnail: 'https://ibb.co/m4BpNkH'
}

const pantalon = {
    title: 'Jogguins x desmontable',
    price: 3255,
    thumbnail: 'https://ibb.co/m4BpNkH'
}

// Prueba de funciones
const Archivo = new Contenedor('Productos.txt')

// guardar
//Archivo.save(vestido)
Archivo.save(buzo)
//Archivo.save(pantalon)

// ver x ID
//Archivo.getByID(3)

// ver todos los productos
//Archivo.getAll()

// borrar x ID
//Archivo.deleteByID(1)

// borrar todo
//Archivo.deleteAll()
