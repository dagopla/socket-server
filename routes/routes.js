"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'todo salio bien'
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    res.json({
        ok: true,
        mensaje: 'todo salio bien POST',
        cuerpo,
        de,
        id
    });
});
