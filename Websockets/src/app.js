import express from 'express';
import __dirname from './utils.js';
import viewsRouter from '../src/routes/views.router.js'
import { Server } from 'socket.io';
import Container from './context/container.js';


const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${server.address().port}`));
const io = new Server(server);
const File = new Container()

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'));
app.use('/products',viewsRouter);


io.on('connection',async (socket) => {
    console.log('socket connected')
    socket.on('addProduct', async data => {
        console.log(data)
        const update = await File.save(data)
        const allProducts = await File.getAll()
        io.emit('allProducts', allProducts)
    })

    socket.on('messages',async data => {
        const chat = await File.saveChat(data)
        const readChat = await File.getChat()
        io.emit("newMessage",readChat)
    })
})