import { usersService } from "../services/services.js";
import { UserDTO } from "../dao/dto/user.dto.js";


const viewUsers = async (req,res) =>{
    const result = await usersService.get()
    const users = []
    result.forEach(user => {
        const u = new UserDTO(user)
        return users.push(u)
    });
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
        await usersService.saveOne(data)
        res.send({message: "usuario creado"})
    } catch (error) {
        res.send(error)
    }
}

export default {
    viewUsers,
    createUser
}

