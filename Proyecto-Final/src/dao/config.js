const persistence = "Mongoose"

let ProductsServices;
let CartsServices;
let UserServices;

switch(persistence){
    case "Memory":
        const {default:MemProducts} = await import('./MemoryDAO/ProductsMemory.js');
        ProductsServices = new MemProducts();
        const {default:MemCarts} = await import('./MemoryDAO/CartsMemory.js');
        CartsServices = new MemCarts();
        const {default:MemUsers} = await import('./MemoryDAO/UserMemory.js');
        UserServices = new MemUsers();
        break;
    case "Mongoose":
        const {default:MongooseProducts} = await import('./MongooseDAO/ProductsMongoose.js');
        ProductsServices = new MongooseProducts();
        const {default:MongooseCarts} = await import('./MongooseDAO/CartsMongoose.js');
        CartsServices = new MongooseCarts();
        const {default:MongooseUsers} = await import('./MongooseDAO/UserMongoose.js');
        UserServices = new MongooseUsers();
        break;
    case "FileSystem":
        const {default:FSproducts} = await import('./FileSystemDAO/ProductsFS.js');
        ProductsServices = new FSproducts();
        const {default:FScarts} = await import('./FileSystemDAO/CartsFS.js');
        CartsServices = new FScarts();
        const {default:FSusers} = await import('./FileSystemDAO/UserFS.js');
        UserServices = new FSusers();
        break;
}


const services = {
    ProductsServices,
    CartsServices,
    UserServices
}

export default services