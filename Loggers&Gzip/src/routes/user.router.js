import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get('/',userController.viewUsers);
router.post('/createOne',userController.createUser);

export default router