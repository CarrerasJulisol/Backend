import { userService } from "../services/index.js";
import { UserDTO } from "../dao/dto/user.dto.js";

const viewUsers = async (req,res) =>{
    const result = await userService.getUsers()
    const users = result.map(user=>new UserDTO(user));
    console.log(users)
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
        console.log(data)
        const user = await userService.saveUser(data)
        console.log(user)
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

