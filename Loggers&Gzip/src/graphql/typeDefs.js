import { gql } from "apollo-server-express";

const typeDefs = gql`

    type User {
        _id: ID
        name: String
        lastName: String
        email: String
        age: String
        password: String
    }

    type Product {
        name: String
        price: String
        stock: String
        image: String
    }
    
    type Query {
        getAllUsers: [User]
        getAllProducts: [Product]
    }

    type Mutation {
        createUser(name:String,lastName:String,email:String,age:String,password:String): User
    }
`
export default typeDefs