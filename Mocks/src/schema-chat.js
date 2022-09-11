import { normalize, schema } from "normalizr";

const chatBox = {
    messages: [
        {
            id:1,
            author: {
                id:1,
                name:'Juan',
                lastName:'A',
                age:12,
                nick:'Juancito',
                avatar:'xdd'
            },
            content:'hola'
        },
        { 
            id:2,
            author: {
                id:2,
                name:'Maria',
                lastName:'B',
                age:15,
                nick:'Baria',
                avatar:'ja'
            },
            content:'holss'
        }
    ]
}

const author = new schema.Entity('authors');
const message = new schema.Entity('messages',{
    author:author
})
const chat = new schema.Entity('chat',{
    author:author,
    messages:[message]
})

const normalizedData = normalize(chatBox,chat);
console.log(JSON.stringify(normalizedData))