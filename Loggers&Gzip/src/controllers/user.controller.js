import UserRepository from "../services/userRepostory.js";
import { UserDTO } from "../dao/dto/user.dto.js";

const service = new UserRepository()

const viewUsers = async (req,res) =>{
    await service.init()
    const result = await service.getUsers()
    const users = result.map(user=>new UserDTO(user));
    res.render("users",{
        users
    })
}

const createUser = async (req,res) =>{
    try {
        const { name, lastName, age, email } = req.body
        let data = {
            name,
            lastName,
            age,
            email
        }
        const user = await service.saveUser(data)
        res.send({message: "usuario creado"})
    } catch (error) {
        res.send(error)
    }
}

export default {
    viewUsers,
    createUser
}
//Persistence.users.getUsers();

