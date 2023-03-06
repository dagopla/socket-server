"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = enviroment_1.SERVER_PORTS;
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
