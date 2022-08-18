import config from "../sqlite3.config.js";
import knex from "knex";

const database = knex(config);

try{
    /*let exists1 = await database.schema.hasTable('products');
    let exists2 = await database.schema.hasTable('chat');
    if(exists1){
        await database('products').del();
    }
    if(exists2){
        await database('chat').del();
    }
    else{
        await database.schema.createTable('products', table=>{
            table.primary('id');
            table.increments('id');
            table.string('name',20);
            table.float('price');
            table.string('image',50);
        })
        await database.schema.createTable('chat', table =>{
                table.primary('id');
                table.increments('id');
                table.string('message',140);
                table.string('email',50)
                table.dateTime('date');
            })
        }*/
}catch(error){
    console.log(error);
}

export default database;