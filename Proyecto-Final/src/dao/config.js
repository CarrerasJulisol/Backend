const persistence = "Mongoose"

let ProductsServices;
let CartsServices;

switch(persistence){
    case "Memory":
        const {default:MemProducts} = await import('./MemoryDAO/ProductsMemory.js');
        ProductsServices = new MemProducts();
        const {default:MemCarts} = await import('./MemoryDAO/CartsMemory.js');
        CartsServices = new MemCarts();
        break;
    case "Mongoose":
        const {default:MongooseProducts} = await import('./MongooseDAO/ProductsMongoose.js');
        ProductsServices = new MongooseProducts();
        const {default:MongooseCarts} = await import('./MongooseDAO/CartsMongoose.js');
        CartsServices = new MongooseCarts();
        break;
    case "FileSystem":
        const {default:FSproducts} = await import('./FileSystemDAO/ProductsFS.js');
        ProductsServices = new FSproducts();
        const {default:FScarts} = await import('./FileSystemDAO/CartsFS.js');
        CartsServices = new FScarts();
        break;
}


const services = {
    ProductsServices,
    CartsServices
}

export default services