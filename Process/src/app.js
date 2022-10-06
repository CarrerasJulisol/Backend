import express from 'express';
import __dirname from '../src/utils.js';
import viewsRouter from '../src/routes/views.router.js';
import apiRouter from './routes/api.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { Server } from 'socket.io';
import Container from './context/container.mongoose.js';
import mongoose from 'mongoose';
import passport from 'passport';
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import config from './config/config.js';
import infoRouter from './routes/info.router.js';

const app = express();

const server = app.listen(config.app.PORT,()=>console.log(`Listening on ${server.address().port}`));

mongoose.connect(config.mongo.MONGO_URL)
const io = new Server(server);
const File = new Container()

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'));
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.MONGO_URL,
        ttl:1000
    }),
    secret:'th3Sess1onS2',
    resave:false,
    saveUninitialized:false
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/products',viewsRouter);
app.use('/api',apiRouter);
app.use('/session',sessionsRouter);
app.use('/info',infoRouter);

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