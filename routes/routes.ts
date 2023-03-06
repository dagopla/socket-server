import { Router, Request, Response } from "express";

export const router=Router();

router.get('/mensajes',(req:Request, res:Response)=>{
    res.json({
        ok:true,
        mensaje:'todo salio bien'
    })

})
router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo= req.body.cuerpo;
    const de = req.body.de;
    const id= req.params.id
    res.json({
        ok:true,
        mensaje:'todo salio bien POST', 
        cuerpo,
        de,
        id
    })

})