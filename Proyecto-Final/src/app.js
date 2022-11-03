import express from "express";
import __dirname from "./utils.js";
import initializePassport from "./config/passport.config.js";
import passport from 'passport';
import session from "express-session";
import MongoStore from "connect-mongo";
import viewProducts from "./routes/products.router.js";
import viewCarts from "./routes/carts.router.js";
import viewHome from "./routes/home.router.js";
import viewSignIn from "./routes/signin.router.js"

const app = express();
let PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(__dirname+'public'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://julieta:12345@proyecto-carreras.appkwcp.mongodb.net/Base001?retryWrites=true&w=majority',
        ttl:1000
    }),
    secret:'th3Sess1onS2',
    resave:false,
    saveUninitialized:false
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/home',viewHome);
app.use('/api/products', viewProducts);
app.use('/api/carts', viewCarts);
app.use('/account',viewSignIn);