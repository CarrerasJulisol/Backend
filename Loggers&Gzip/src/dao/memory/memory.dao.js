export default class MemoryDao {
    constructor(){
        this.entities = {
            users:[],
            products:[]
        }
    }
    
    isValidEntity(entity){
        if (!this.entities[entity]) {
            throw new Error('Entity not defined on MemorDao')
        }
    }

    async getAll(entity){
        this.isValidEntity(entity)
        return this.entities[entity]
    }

    async save(element,entity){
        this.isValidEntity(entity);
        console.log("element",element,"entity",entity)
        if(this.entities[entity].length===0){
            element.id = 1
        }else{
            element.id = this.entities[entity][this.entities[entity].length-1].id+1
        }
        this.entities[entity].push(element)
        return element
    }
}