import express from "express";
import __dirname from "./utils.js";
import viewProducts from "./routes/products.router.js";
import viewCarts from "./routes/carts.router.js";

const app = express();
let PORT = 8080;
const server = app.listen(PORT, ()=> console.log(`Server listening on ${server.address().port}`));

app.use(express.json());
app.use(express.static(__dirname+'public'))
app.use(express.urlencoded({extended: true}))

app.use('/api/products', viewProducts);
app.use('/api/carts', viewCarts);