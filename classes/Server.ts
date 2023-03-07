import express, { Application } from 'express'
import { SERVER_PORTS } from '../global/enviroment';
import socketIO from 'socket.io'
import http from 'http'
import * as sock from '../socket/socket'

export default class Server{

    private static _instance: Server;


    public app:Application;
    public port:number;
    public io: socketIO.Server;
    private httpServer:http.Server;
    private constructor(){
        this.app= express();
        this.port=SERVER_PORTS;
        this.httpServer=new http.Server(this.app);
        this.io=new socketIO.Server(this.httpServer , {cors:{origin:'*'}});

        this.escuchandoSockets();
    }

    public static get instance(){
        return this._instance || (this._instance= new this());
    }

    private escuchandoSockets(){
        console.log('escuchando sockets');
        this.io.on('connection', cliente =>{
            sock.conectarCliente(cliente)
            //Mensajes
            sock.mensaje(cliente,this.io);
            //desconectar
            sock.desconectar(cliente);
            //Configurar usuario
            sock.configUser(cliente);
            
        })
        
    }   

    start(callback: (() => void)){

        this.httpServer.listen(this.port , callback);
    }
}