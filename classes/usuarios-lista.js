"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Usuario actualizado =======');
        console.log(this.lista);
    }
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(user => user.id === id);
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter(user => user.sala === sala);
    }
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(user => user.id !== id);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
