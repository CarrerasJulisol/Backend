export default class User {
    static get model(){
        return 'User';
    }
    static get schema(){
        return {
            name:String,
            lasName:String,
            age:Number,
            email:String
        }
    }
}