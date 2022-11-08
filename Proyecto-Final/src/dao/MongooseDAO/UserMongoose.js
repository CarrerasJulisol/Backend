import MongooseContainer from './MongooseContainer.js';
import userModel from './models/users.schema.js';

export default class UserService extends MongooseContainer{
    constructor(){
        super(userModel);
    }

    async findEmail(email){
        return this.model.findOne({email:email});
    }

    async createUser(newA){
        return this.model.create(newA);
    }

    async findID(id){
        return this.model.findOne({_id:id});
    }

    async addCartID(userID,cartID){
        return this.model.findByIdAndUpdate({_id:userID},{$set:{cartID:cartID}})
    }
}