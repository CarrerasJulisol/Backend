import express from 'express';
import winston from 'winston';
import __dirname from '../src/utils.js';
import infoRouter from './routes/info.router.js';
import usersRouter from './routes/user.router.js';

const app = express();
const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level:'warn',filename:'warn.log'}),
        new winston.transports.File({level:'error',filename:'error.log'})
    ]
})

const PORT = process.env.PORT || 8080

const time = Date.now();
const today = new Date(time);

app.listen(PORT,()=>console.log(`Porcess ${process.pid} listening`))

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    try {
        logger.log('info', `Fecha y Hora:${today.toUTCString()}. Método: GET. URL: http://localhost:8080`)
        logger.log('warn', "atencion en primer get")
        res.send(`El proceso con pid ${process.pid} atendió esta consulta en ${PORT}`)
    }catch(error){
        logger.log('error', `Hubo un error: ${error}`)
    }
});

app.use('/info',infoRouter);
app.use('/users',usersRouter);