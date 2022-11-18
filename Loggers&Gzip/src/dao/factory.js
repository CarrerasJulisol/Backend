import config from "../config/config.js";

const PERSISTENCE = config.app.PERSISTENCE

export default class PersistenceFactory {
    static getPersistence = async() => {
        switch(PERSISTENCE){
            case "MEMORY":
                let {default:MemoryDao} = await import("../dao/memory/memory.dao.js")
                return {
                    services: new MemoryDao()
                }
            case "MONGOOSE":
                let {default:MongooseDao} = await import("../dao/mongoose/mongoose.dao.js")
                return {
                    services: new MongooseDao()
                }
        }
    }
}