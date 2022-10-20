import dotenv from 'dotenv';
import minimist from "minimist";
import __dirname from '../utils.js';

const {
    MODE,
    PORT,
    _
} = minimist(process.argv.slice(2),{alias:{m:"MODE",p:"PORT"},default:{m:'FORK',p:8080}})

const mode = process.argv.slice(2)[0];

console.log(mode);

dotenv.config({
    path:mode==="FORK"?__dirname+'/.ecosystem.config':__dirname+'/.env.production'
});

export default {
    app:{
        MODE:process.env.MODE || 'FORK',
        PORT:process.env.PORT || 8080,
        DEBUG:process.env.DEBUG || false
    }
}