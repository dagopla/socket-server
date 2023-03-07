import { Usuario } from './usuario';

export class UsuariosLista{
    private lista: Usuario[]=[];

    constructor(){

    }
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario
    }
    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id===id){
                usuario.nombre=nombre;
                break;
            }
        }
        console.log('Usuario actualizado =======');
        console.log(this.lista);
        
        
    }
    public getLista(){
        return this.lista;
    }
    public getUsuario(id:string){
        return this.lista.find(user=>user.id===id);

    }
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(user=> user.sala===sala);
    }
    public borrarUsuario(id:string){
        const tempUsuario= this.getUsuario(id);
        this.lista=this.lista.filter(user=> user.id!==id);
        return tempUsuario;
    }
}