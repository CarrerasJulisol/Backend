import express from "express";
import winston from "winston";
import __dirname from "./utils.js";
import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import passport from 'passport';
import session from "express-session";
import MongoStore from "connect-mongo";
import viewHome from "./routes/home.router.js";
import viewSignIn from "./routes/signin.router.js";
import myCart from "./routes/myCart.router.js";
import cookieParser from 'cookie-parser';

const app = express();
let PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.Console({level:'warn'}),
        new winston.transports.Console({level:'error'})
    ]
})

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    store:MongoStore.create({
        mongoUrl:`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@proyecto-carreras.appkwcp.mongodb.net/${config.mongo.DB}`,
        ttl:1000
    }),
    secret:config.mongo.SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(cookieParser())
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/home',viewHome);
app.use('/account',viewSignIn);
app.use('/mycart',myCart);