import { Router } from "express";
import __dirname from "../utils.js";
import Container from "../context/container.mongoose.js";
import faker from "faker";
import { normalize, schema } from "normalizr";

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();
const File = new Container();

router.get('/', async (req, res)=> {
    const allProducts = await File.getAll()
    res.render('products',{
        hasProducts:allProducts.length>0,
        allProducts,
        user:null
    });
})

// para verificar que todo se guarda bien:
router.get('/api', async (req, res)=> {
    const allProducts = await File.getAll()
    res.send(allProducts);
})

router.get('/chat', async (req, res)=> {
    const chat = await File.getChat()
    res.send(chat);
})

// faker
router.get('/api/products-test', async (req, res)=>{
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

//normalizr
router.get('/normalized', async (req, res)=>{
    let normalize = await File.getNormalize()
    res.send(normalize)
})

export default router