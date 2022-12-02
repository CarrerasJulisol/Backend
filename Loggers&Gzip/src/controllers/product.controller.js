import { productService } from "../services/services.js";
import { ProductDTO } from "../dao/dto/product.dto.js";

const viewProducts = async (req,res) =>{
    const result = await productService.get()
    const products = []
    result.forEach(user => {
        const u = new ProductDTO(user)
        return products.push(u)
    });
    res.render("products",{
        products
    })
}

const createProduct = async (req,res) =>{
    try {
        const { name, price, stock, image } = req.body
        let data = {
            name,
            price,
            stock,
            image
        }
        await productService.saveOne(data)
        res.send({message: "producto creado"})
    } catch (error) {
        res.send(error)
    }
}

export default {
    viewProducts,
    createProduct
}

