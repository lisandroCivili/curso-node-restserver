import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config()
import { router } from '../routes/usuarios.js';
import { dbConnection } from '../database/config.js';


export class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a db
        // Al momento de crear el server se hace la conexion a la db
        this.conectarDB(); 
        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }
    
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // TODOS ESTOS MIDDLEWARES SE EJECUTAN ANTES DE INGRESAR A '/api/usuarios' 
        this.app.use( cors() );

        this.app.use( express.json() ) //En este caso se esta creando un middleware de archivos json. 

        // Aca le indicamos lo que va a mostrar cuando nos dirijamos al path que esta en la func "routes()", 
        // que en este caso sería el index.html.
        this.app.use( express.static('public') )
    }

    routes(){

        this.app.use(this.usuariosPath, router);
        // En este caso, con "use" le asignamos en el 1er argumento a "router" un path especifico.
        // El path en cuestion: this.usuariosPath = '/api/usuarios';

       
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en puerto ${this.port}`)
        })
    }

}