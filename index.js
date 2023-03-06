"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./classes/Server"));
const routes_1 = require("./routes/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = Server_1.default.instance;
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((0, cors_1.default)());
server.app.use('/', routes_1.router);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
