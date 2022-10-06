import { Router } from "express";

const router = Router();

router.get('/', async (req, res)=> {
    const data = {
        args: process.argv.slice(2),
        execPath: process.cwd(),  
        platform: process.platform,
        processID: process.pid,   
        nodeVersion: process.version,
        folder: process.argv[1],
        memory: `${Math.round( JSON.stringify(process.memoryUsage.rss())/ 1024 / 1024 * 100) / 100} MB`
    }
    res.render('info', {data})
})


export default router