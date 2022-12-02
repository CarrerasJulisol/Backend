import PersistenceFactory from '../dao/factory.js';
import UserRepository from './users.js';
import ProductRepository from './products.js';


const dao = await PersistenceFactory.getPersistence();

export const usersService =  new UserRepository(dao);
export const productService =  new ProductRepository(dao);