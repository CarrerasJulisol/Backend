// para usarlo con type module
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default __dirname;