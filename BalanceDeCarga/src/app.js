import express from 'express';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>console.log(`Porcess ${process.pid} listening`))

app.get('/',(req,res)=>{
    res.send(`El proceso con pid ${process.pid} atendió esta consulta en ${process.env.PORT}`)
})

app.get('/info', async (req, res)=> {
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
    res.send({data: data})
})
