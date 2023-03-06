import express, { Application } from 'express'
import { SERVER_PORTS } from '../global/enviroment';

export default class Server{
    public app:Application;
    public port:number;
    constructor(){
        this.app= express();
        this.port=SERVER_PORTS;
    }
    start(callback: Function){

        this.app.listen(this.port , callback);
    }
}