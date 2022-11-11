import winston from 'winston';
import os from 'os';

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level:'warn',filename:'warn.log'}),
        new winston.transports.File({level:'error',filename:'error.log'})
    ]
})

const infoProcess = async (req, res)=> {
    const time = Date.now();
    const today = new Date(time);   
    try {
        logger.log('info', `Fecha y Hora:${today.toUTCString()}. Método: GET. URL: http://localhost:8080/info`)
        const data = {
            args: process.argv.slice(2),
            execPath: process.cwd(),  
            platform: process.platform,
            processID: process.pid,   
            nodeVersion: process.version,
            folder: process.argv[1],
            memory: `${Math.round( JSON.stringify(process.memoryUsage.rss())/ 1024 / 1024 * 100) / 100} MB`,
            processors:os.cpus().length
        }
        res.render('info', {data})
    }catch(error){
        logger.log('error', `Hubo un error: ${error}`)
    }
}

export default { 
    infoProcess 
}