
import Server from './classes/Server';
import { router } from './routes/routes';
import bodyParser from 'body-parser'
import cors from 'cors'
const server= Server.instance;

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(cors());
 

server.app.use('/', router);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});