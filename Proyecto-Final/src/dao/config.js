const persistence = "FileSystem"

let ProductsServices;

switch(persistence){
    case "Memory":
        const {default:MemProducts} = await import('./MemoryDAO/ProductsMemory.js');
        ProductsServices = new MemProducts();
        const {default:MemCarts} = await import('./MemoryDAO/CartsMemory.js');
        CartsServices = new MemCarts();
        break;
    case "MongoDB":
        const {default:MongoProducts} = await import('./MongoDAO/ProductsMongo.js');
        ProductsServices = new MongoProducts();
        const {default:MongoCarts} = await import('./MongoDAO/CartsMongo.js');
        ProductsServices = new MongoCarts();
        break;
    case "FileSystem":
        const {default:FSproducts} = await import('./FileSystemDAO/ProductsFS.js');
        ProductsServices = new FSproducts('products');
        const {default:FScarts} = await import('./FileSystemDAO/CartsFS.js');
        CartsServices = new FScarts('carts');
        break;
}


const services = {
    ProductsServices,
}

export default services