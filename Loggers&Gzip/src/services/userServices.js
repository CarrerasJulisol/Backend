import PersistenceFactory from "../dao/factory";

export default class UserService {
    constructor(dao) {
        this.dao;
        this.entity = 'users';
    }

    init = async()=>{
        const {services} = await PersistenceFactory.getPersistence();
        this.dao = services
    }

    async getUsers(){
        return this.dao.getAll(this.entity)
    }

    async saveUser(user){
        return this.dao.save(user, this.entity)
    }
}