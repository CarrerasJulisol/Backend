import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import winston from 'winston';
import __dirname from '../src/utils.js';
import infoRouter from './routes/info.router.js';
import usersRouter from './routes/user.router.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolver.js';
import productsRouter from './routes/product.router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';


const app = express();
const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level:'warn',filename:'warn.log'}),
        new winston.transports.File({level:'error',filename:'error.log'})
    ]
})
const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info: {
            title:"API swagger",
            description: "API para la tarea de swagger"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions)
const PORT = process.env.PORT || 8080

const time = Date.now();
const today = new Date(time);

app.listen(PORT,()=>console.log(`Porcess ${process.pid} listening`))

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    try {
        logger.log('info', `Fecha y Hora:${today.toUTCString()}. Método: GET. URL: http://localhost:8080`)
        //logger.log('warn', "atencion en primer get")
        res.send(`El proceso con pid ${process.pid} atendió esta consulta en ${PORT}`)
    }catch(error){
        logger.log('error', `Hubo un error: ${error}`)
    }
});

app.use('/info',infoRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});
await apolloServer.start();
apolloServer.applyMiddleware({app});