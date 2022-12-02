import { usersService, productService } from "../services/services.js"

const resolvers = {
    Query: {
        getAllUsers: async () => {
            const users = await usersService.get()
            return users
        },
        getAllProducts: async () => {
            const products = await productService.get()
            return products
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const user = await usersService.saveOne(args)
            return user
        }
    }
}

export default resolvers