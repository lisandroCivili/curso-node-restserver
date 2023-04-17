import express from 'express';
import cors from 'cors';
import { router } from '../routes/usuarios.js';


export class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }
    
    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() ) //En este caso se esta crean un middleware de archivos json. 

        this.app.use( express.static('public') )
    }

    routes(){

        this.app.use(this.usuariosPath, router);
       
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en puerto ${this.port}`)
        })
    }

}