"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configUser = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log(`Cliente desconectado ${cliente.id}`);
        exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('mensaje recibido', payload);
        io.emit("nuevo-mensaje", payload);
    });
};
exports.mensaje = mensaje;
const configUser = (cliente) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        console.log('Configuracion recibida', payload);
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario${payload.nombre},configurado`
        });
    });
};
exports.configUser = configUser;
