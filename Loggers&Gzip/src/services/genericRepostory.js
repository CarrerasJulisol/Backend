export default class GenericRepository {
    constructor(dao,entity) {
        this.dao = dao;
        this.entity = entity;
    }

    async get(){
        return this.dao.services.getAll(this.entity)
    }

    async saveOne(user){
        return this.dao.services.save(user, this.entity)
    }
}