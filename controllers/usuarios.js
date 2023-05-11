import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario.js';



export const usuariosGet = (req = request, res = response) =>{
    
    //La query es la peticion a la base de datos.
    //de "req.query" podemos desestructurar (porque es un objeto) los argumentos que vienen en la url.
    //Por ej: http://localhost:8080/api/usuarios?q=cat&name=shoes&page=2&limit=10 todo los separado por "&" son argumentos
    const {q, name = "no name", page= 1, limit} = req.query;

    res.json({
        msg: "get API - controlador",   
        q,
        name,
        page,
        limit,  
    });

}

export const usuariosPut = async(req = request, res = response) =>{

                                        /*Porceso para actulizar datos en BD*/      

    //En este caso desestructuramos el "id", que es un parametro que sirve para por ejemplo al momento de actualizar
    //la info. de un usuario, identificar el mismo. Pueden haber varios parametros para ser mas especificos sobre lo que 
    //vamos a realizar un cambio, borrar o agregar (PUT, POST  & DELETE).
    const { id } = req.params;

    // Desestructuramos lo que viene del body, guardamos lo que necesitamos en la vble "resto", y lo que no, dejamos
    // afuera.
    const { _id, password, google, correo, ...resto} = req.body;
    // ¿Por que sacamos el "_id"? Porque en la bd el id se guarda asi (_id) entonces si el usuario manda un id declarado
    // de esa forma, este puede chocar con el que se encuentra en la bd y producir un error.

    // En caso de que el usuario envie el pass, significa que quiere acctualizarlo. Recibimos el pass, lo ecnriptamos y
    // lo guardamos en el objeto "resto".
    if (password) {
        const salt = bcryptjs.genSaltSync() 
        resto.password = bcryptjs.hashSync( password, salt );
    }

    // Aca esperamos los datos que envia el usuario, la func 'findByIdAndUpdate()' recibe el en el 1er argumento
    // id del usuario si es que el mismo paso las validaciones, y en el segundo recibe el objeto con la info. 
    // para actualizar, la func. automaticamente sobreescribe los archivos en bd, es decir no hace falta el 'save()'.
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
    });

}

export const usuariosPost = async(req, res = response) =>{

    const {nombre, password, correo, rol} = req.body;
    const usuario = new Usuario({nombre, password, correo, rol});

    // Verificar si existe el correo
    
    // Encriptar contraseña
        //Con el paquete bcryptjs, hacemos la encriptacion
    const salt = bcryptjs.genSaltSync() //Con "genSaltSync()" le decimos cuantas veces mezcla la contraseña, + vueltas
    // demora mas pero es mas seguro, de todas formas con 10 (q es lo que viene por defecto) esta bien
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD

    await usuario.save();

    res.json({
        usuario
    });

}

export const usuariosDelete = (req, res = response) =>{

    res.json({
        msg: "delete API - controlador"
    });

}

export const usuariosPatch = (req, res = response) =>{

    res.json({
        msg: "patch API - controlador"
    });

}