import express from 'express';
import __dirname from './utils.js';
import viewsRouter from '../src/routes/views.router.js'
import productosRouter from '../src/routes/products.router.js'
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${server.address().port}`));

app.set('views',__dirname+'/views');
app.set('view engine','ejs')

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use('/',viewsRouter)
app.use('/api/productos',productosRouter)