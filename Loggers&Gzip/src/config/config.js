import dotenv from 'dotenv';
import __dirname from '../utils.js';

const mode = process.argv.slice(2)[0];
dotenv.config({
    path:mode==="PROD"?__dirname+'/.env.production':__dirname+'/.env.development'
});

export default {
    app:{
        MODE:process.env.MODE || 'PROD',
        PORT:process.env.PORT,
        DEBUG:process.env.DEBUG || false,
        PERSISTENCE:process.env.PERSISTENCE
    },
    mongo:{
        USER:process.env.MONGO_USER,
        PWD:process.env.MONGO_PWD,
        DB:process.env.MONGO_DATABASE,
    }
}