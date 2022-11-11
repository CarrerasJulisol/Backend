import MemoryDao from "../dao/memory/memory.dao.js";
import UserService from "../services/userServices.js";
//import MongooseDAO from "../dao/mongoose/mongoose.dao.js";

const dao = new MemoryDao();

// no funciona bien porque no me deja importar el config.js (con los
// datos de usuario, database,etc de mongo) en mongoose.dao
//const dao = new MongooseDAO();

export const userService = new UserService(dao);