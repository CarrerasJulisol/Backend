import { Router } from "express";
import winston from 'winston';

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level:'warn',filename:'warn.log'}),
        new winston.transports.File({level:'error',filename:'error.log'})
    ]
})

const router = Router();

const time = Date.now();
const today = new Date(time);

router.get('/', (req,res)=>{
    try {
        logger.log('info', `Fecha y Hora:${today.toUTCString()}. Método: GET. URL: http://localhost:8080/randoms`)
        let randoms = []
        for (let i=0;i<1000;i++){
        let random = Math.floor(Math.random()*9);
        randoms.push(random);
    };
    res.send({randoms})
    } catch (error) {
        logger.log('error', `Hubo un error: ${error}`)
    }
    
})

export default router;