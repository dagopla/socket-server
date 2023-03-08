import { Router, Request, Response } from "express";
import { RemoteSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Server from '../classes/Server';
import { usuariosConectados } from '../socket/socket';

export const router=Router();

router.get('/mensajes',(req:Request, res:Response)=>{
    
    res.json({
        ok:true,
        mensaje:'todo salio bien'
    })

})
router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.instance;
    server.io.fetchSockets().then((sockets:RemoteSocket<DefaultEventsMap, any>[])=>{
        if (sockets.length>0) {
            const listClient= sockets.map(cliente=>cliente.id)
            return res.json({
                ok:true,
               // clientes
                clientes: 'hola'
            });
        }
        return res.json({
            ok:true,
            clientes:[]
        })
        
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});
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

});
router.get('/usuarios/detalles',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        clientes:usuariosConectados.getLista()
    })
    
});