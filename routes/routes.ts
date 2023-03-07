import { Router, Request, Response } from "express";
import Server from '../classes/Server';

export const router=Router();

router.get('/mensajes',(req:Request, res:Response)=>{
    
    res.json({
        ok:true,
        mensaje:'todo salio bien'
    })

})
router.post('/mensajes',(req:Request, res:Response)=>{
    const cuerpo= req.body.cuerpo;
    const de = req.body.de;

    const payload={
        de,
        cuerpo
    }
//mensajes privados por el id del usuario
    const server= Server.instance;
    server.io.emit('nuevo-mensaje',payload)
    res.json({
        ok:true,
        mensaje:'todo salio bien POST', 
        cuerpo,
        de,
        
    })

})
router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo= req.body.cuerpo;
    const de = req.body.de;
    const id= req.params.id;

    const payload={
        de,
        cuerpo
    }
//mensajes privados por el id del usuario
    const server= Server.instance;
    server.io.in(id).emit('mensaje-privado',payload)
    res.json({
        ok:true,
        mensaje:'todo salio bien POST', 
        cuerpo,
        de,
        id
    })

})