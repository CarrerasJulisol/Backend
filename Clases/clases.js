class Usuario {
    constructor(name, lastname) {
        this.name = name
        this.lastname = lastname
        this.books = []
        this.pets = []
    }

    getFullName() {
        return `El nombre completo es ${this.name} ${this.lastname}`
    }

    addPet(petName) {
        this.pets.push(petName)
        return console.log("Mascota aagregada")
    }

    countPets() {
        return this.pets.length
    }

    addBook(bookName, bookAuthor) {
        this.books.push({Book: bookName, Author: bookAuthor})
        return console.log("Libro Agergado")
    }

    getBookNames() {
        return this.books.map((lista)=> {
            return lista.Book
        })
    }
}


const usuario1 = new Usuario("Maria Sol", "Suarez")
const usuario2 = new Usuario("Eliana", "Lopez")
const usuario3 = new Usuario("Agustin", "Ruiz")

// agrego mascotas a cada usuario
usuario1.addPet("Belkis")
usuario1.addPet("Remi")
usuario2.addPet("Blacky")
usuario3.addPet("Airi")
usuario3.addPet("Haku")

// agrego libros a cada usuario
usuario1.addBook("El hombre Bicentenario", "Isaac Asimov")
usuario2.addBook("La quimera del oro", "Jack London")
usuario2.addBook("Crónica de una muerte anunciada", "Gabriel García Márquez")
usuario2.addBook("Harry Potter y la piedra filosofal", "J. K. Rowling")
usuario3.addBook("Fahrenheit 451", "Ray Bradbury")
usuario3.addBook("Las maquinas de la alegria", "Ray Bradbury")

console.log(`${usuario1.getFullName()}. Tiene ${usuario1.countPets()} mascotas y los siguientes libros: ${usuario1.getBookNames()}.`)
console.log(`${usuario2.getFullName()}. Tiene ${usuario2.countPets()} mascotas y los siguientes libros: ${usuario2.getBookNames()}.`)
console.log(`${usuario3.getFullName()}. Tiene ${usuario3.countPets()} mascotas y los siguientes libros: ${usuario3.getBookNames()}.`)


