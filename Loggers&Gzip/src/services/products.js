import GenericRepository from "./genericRepostory.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao){
        super(dao,'Products');
    }
}

