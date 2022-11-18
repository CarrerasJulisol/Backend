import PersistenceFactory from "../dao/factory.js";

export default class UserRepository {
    constructor(dao) {
        this.dao;
        this.entity = 'User';
    }

    async init() {
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