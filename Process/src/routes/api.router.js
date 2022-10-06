import { Router } from "express";
import __dirname from "../utils.js";
import faker from "faker";
import { fork } from "child_process";

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();

// faker
router.get('/products-test', async (req, res)=>{
    let testProducts = [];
    for(let i=0; i<5; i++){
        testProducts.push({
            name:commerce.productName(),
            price:commerce.price(),
            image:image.imageUrl()
        })
    }
    res.render('products-test',{
        testProducts
    });
})
router.get('/randoms', (req, res)=>{
    const cant = req.query.cant || ( 100 * 1000 * 1000 )
    const child = fork(__dirname+'/utils/operation.js')
    child.send(parseInt(cant))
    child.on('message',(result)=> {
        res.json({
            result: result
        })
    })
})

export default router
