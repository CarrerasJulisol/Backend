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
        DEBUG:process.env.DEBUG || false,
        DOMAIN:process.env.DOMAIN
    },
    session:{
        ADMIN_EMAIL:process.env.ADMIN_EMAIL,
        ADMIN_PWD: process.env.ADMIN_PWD
    },
    mongo:{
        USER:process.env.MONGO_USER,
        PWD:process.env.MONGO_PWD,
        DB:process.env.MONGO_DATABASE,
        SECRET:process.env.MONGO_SECRET
    },
    jwt:{
        SECRET:process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    }
}
