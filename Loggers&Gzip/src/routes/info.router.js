import { Router } from "express";
import infoController from "../controllers/info.controller.js";

const router = Router();

router.get('/',infoController.infoProcess);

export default router