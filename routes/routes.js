"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Server_1 = __importDefault(require("../classes/Server"));
const socket_1 = require("../socket/socket");
exports.router = (0, express_1.Router)();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'todo salio bien'
    });
});
exports.router.get('/usuarios', (req, res) => {
    const server = Server_1.default.instance;
    server.io.fetchSockets().then((sockets) => {
        if (sockets.length > 0) {
            const listClient = sockets.map(cliente => cliente.id);
            return res.json({
                ok: true,
                // clientes
                clientes: 'hola'
            });
        }
        return res.json({
            ok: true,
            clientes: []
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    //mensajes privados por el id del usuario
    const server = Server_1.default.instance;
    server.io.emit('nuevo-mensaje', payload);
    res.json({
        ok: true,
        mensaje: 'todo salio bien POST',
        cuerpo,
        de,
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    //mensajes privados por el id del usuario
    const server = Server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        mensaje: 'todo salio bien POST',
        cuerpo,
        de,
        id
    });
});
exports.router.get('/usuarios/detalles', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
