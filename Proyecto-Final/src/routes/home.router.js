import { Router } from "express";

const router = new Router();

router.get('/',(req,res)=>{
    //hay una sesion iniciada?
    const session = req.session.user
    res.render('home',{session});
})

export default router;