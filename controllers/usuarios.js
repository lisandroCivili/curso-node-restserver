import { response, request } from 'express';

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

export const usuariosPut = (req = request, res = response) =>{

    //En este caso desestructuramos el "id", que es un parametro que sirve para por ejemplo al momento de actualizar
    //la info. de un usuario, identificar el mismo. Pueden haber varios parametros para ser mas especificos sobre lo que 
    //vamos a realizar un cambio, borrar o agregar (PUT, POST  & DELETE).
    const { id } = req.params;

    res.json({
        msg: "put API - controlador",
        id
    });

}

export const usuariosPost = (req, res = response) =>{

    res.json({
        msg: "post API - controlador",
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