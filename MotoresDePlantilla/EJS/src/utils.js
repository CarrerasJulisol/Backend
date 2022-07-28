import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;

// para usar multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,__dirname+"/public/img")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})

export const uploader = multer({storage:storage})
