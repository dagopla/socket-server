import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from '../classes/usuario';

export const usuariosConectados= new UsuariosLista();

export const conectarCliente= (cliente:Socket)=>{
    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar=(cliente: Socket , io:socketIO.Server)=>{
    cliente.on('disconnect', ()=>{
        console.log(`Cliente desconectado ${cliente.id}`);
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    })
}
export const mensaje=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje', (payload:{de:string,cuerpo:string})=>{
        console.log('mensaje recibido', payload);
        io.emit("nuevo-mensaje",payload);
        
    });
}
export const callShift=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('call-shift', ()=>{
        console.log('El turno ha sido llamado' );

        io.emit("shift-called", 'shift-received');
        
    });
}
export const configUser=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload:{nombre:string},callback:Function)=>{
        console.log('Configuracion recibida', payload);
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre)
        callback({
            ok:true,
            mensaje:`Usuario${payload.nombre},configurado`
        })
        io.emit('usuarios-activos', usuariosConectados.getLista());
    } )
}
export const obtenerUsuarios=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('obtener-usuarios', ()=>{
        io.emit('usuarios-activos', usuariosConectados.getLista());
    } )
}