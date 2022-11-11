import { userService } from "../services/index.js";

const viewUsers = async (req,res) =>{
    const users = await userService.getUsers()
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

