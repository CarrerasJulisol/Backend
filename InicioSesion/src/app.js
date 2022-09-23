import express from 'express';
import __dirname from '../src/utils.js';
import viewsRouter from '../src/routes/views.router.js';
import fakerRouter from './routes/faker.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { Server } from 'socket.io';
import Container from './context/container.mongoose.js';
import mongoose from 'mongoose';
import passport from 'passport';


const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${server.address().port}`));
//const connection = mongoose.connect(`mongodb+srv://julieta:12345@proyecto-carreras.appkwcp.mongodb.net/usuarios`)
const io = new Server(server);
const File = new Container()

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'));

/*app.use(passport.initialize());
app.use(passport.session());*/

app.use('/products',viewsRouter);
app.use('/api',fakerRouter);
app.use('/session',sessionsRouter);

io.on('connection',async (socket) => {
    console.log('socket connected')
    const chat = await File.getChat()
    io.emit("newMessage",chat)

    socket.on('addProduct', async data => {
        console.log(data)
        const update = await File.save(data)
        const allProducts = await File.getAll()
        io.emit('allProducts', allProducts)
    })

    socket.on('messages',async data => {
        console.log(data)
        const chat = await File.saveChat(data)
        const readChat = await File.getChat()
        io.emit("newMessage",readChat)
    })
})