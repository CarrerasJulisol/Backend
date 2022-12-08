// para usarlo con type module
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default __dirname;

// para usar multer
import multer from 'multer';

//dónde se almacenará
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/img")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})

export const uploader = multer({storage:storage})
// o export default