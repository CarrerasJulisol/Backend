import GenericRepository from "./genericRepostory.js";

export default class UserRepository extends GenericRepository {
    constructor(dao){
        super(dao,'User');
    }
}

