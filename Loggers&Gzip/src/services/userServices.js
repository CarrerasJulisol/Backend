export default class UserService {
    constructor(dao) {
        this.dao = dao;
        this.entity = 'users';
    }

    async getUsers(){
        return this.dao.getAll(this.entity)
    }

    async saveUser(user){
        return this.dao.save(user, this.entity)
    }
}