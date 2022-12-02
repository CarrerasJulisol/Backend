export default class User {
    static get model(){
        return 'User';
    }
    static get schema(){
        return {
            name:String,
            lastName:String,
            age:Number,
            email:String
        }
    }
}