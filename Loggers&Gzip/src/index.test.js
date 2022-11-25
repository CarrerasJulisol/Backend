import Supertest from 'supertest';
import Chai from 'chai';

const expect = Chai.expect;
const requester = Supertest('http://localhost:8080');

describe('server testing', ()=>{
    describe('GETS',()=>{
        it('Inicio el server y debe retornar el ID process', async()=>{
            let response = await requester.get('/');
            expect(response.status).to.be.equal(200)
        })
    })
})

describe('Users testing', () => {
    describe('GETS', () => {
        it('La petición base debe retornar un arreglo de usuarios',async()=>{
            let response = await requester.get('/users');
            const {_body} = response;
            expect(_body.payload).to.be.an('array');
        })
    })
    describe('POSTS', () => {
        it('Debería poder crear un usuario', async()=>{
            const  password = "12345"
            let user = {
                name:'Larisa',
                lastName:'Oviedo',
                age:24,
                email:'larioviedo@gmail.com',
                password
            }
            const response = await requester.post('/users/createOne').send(user);
            const {_body} = response;
            console.log(_body);
            expect(_body.payload).to.include.keys('password','email');
        })
    })
})

describe('Info testing', () => {
    describe('GETS', () =>{
        it('Deberia retornar un objeto con la data de process',async()=>{
            let response = await requester.get('/info');
            const {_body} = response;
            expect(_body.payload).to.be.an('object');
        })
    })
})