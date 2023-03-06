"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = void 0;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
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
