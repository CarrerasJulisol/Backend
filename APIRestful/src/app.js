import express from 'express';
import __dirname from './utils.js';
import productosRouter from './routes/productos.router.js'

const app = express()
const PORT = 8080
const server = app.listen(PORT,()=>console.log(`listening on ${server.address().port} port`))

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended: true}))
app.use('/api/productos',productosRouter)

server.on("error", error => console.log(`Error en el servidor ${error}`))