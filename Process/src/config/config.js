import dotenv from 'dotenv';
import minimist from "minimist";
import __dirname from '../utils.js';

const {
    MODE,
    PORT,
    _
} = minimist(process.argv.slice(2),{alias:{m:"MODE",p:"PORT"},default:{m:'PROD',p:8080}})

const mode = process.argv.slice(2)[0];

console.log(mode);

dotenv.config({
    path:mode==="PROD"?__dirname+'/.env.production':__dirname+'/.env.development'
});

export default {
    app:{
        MODE:process.env.MODE || 'PROD',
        PORT:process.env.PORT || 8080,
        DEBUG:process.env.DEBUG || false
    },
    mongo:{
        MONGO_URL:process.env.MONGO_URL
    }
}