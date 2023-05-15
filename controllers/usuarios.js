import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario.js';

        /*ACLARACION SOBRE LAS FUNCIONES DE BUSQUEDA QUE SE USAN DSPS DE Usuario.funcionDeBusqueda() (ejemplo) */
/*Siempre que se pone una funcion de busqueda despues de Usuario, esta lo que hace es fijarse en el modelo de usuario
que se encuentra en models/usuario.js y si coincide con alguna de las propiedades del modelo, devuelve algo, es decir
por ejemplo que si ponemos como criterio de busqueda que encuentre un usuario que no contenga la propiedad nombre,
la funcion no va devolver nada ya que tal usuario no existe :)*/

export const usuariosGet = async(req = request, res = response) =>{
    
    //La query es la peticion a la base de datos.
    //de "req.query" podemos desestructurar (porque es un objeto) los argumentos que vienen en la url.
    //Por ej: http://localhost:8080/api/usuarios?q=cat&name=shoes&page=2&limit=10 todo los separado por "&" son argumentos
    // const {q, name = "no name", page= 1, limit} = req.query;

    // Desestructuramos "limite" y "desde" para decirle que cantidad de usuarios queremos que muestre.
    const {limite = 5, desde = 0} = req.query

    // Esto sería un criterio/filtro que le podemos poner a las func. de busqueda, en es caso lo guardamos en una vble.
    // Con este criterio le decimos que solo devuelva los usuarios que tengan estado = true.
    const query = { estado: true }

/*
    // Con find() devolvemos TODOS  los usuarios, ya que no se puso ningun filtro ni criterio de busqueda.
    const usuarios = await Usuario.find( query )
        .skip(Number(desde))//Con skip se indica desde donde
        .limit(Number(limite))//Con limit hasta donde
        // En ambos hacemos uso de Number() ya que lo que traemos del url como argumento viene como string, y las func
        // skip y limit solo leen number por lo que se tranforman.

    // Esta funcion cuenta los resultados que 
    const total = await Usuario.countDocuments( query );
*/

    /*El inconveniente que se presenta con estas dos vbles "usuarios" y "total", es que ambas son func. asincronas
    y las func. async son bloqueantes, es decir que hasta que no termine una no empieza la otra o sea que 
    hasta que no termine de ejecutarse "usuarios" no se ejecutara "total" y esto puede hacer que se agrande el tiempo 
    de respuesta. Para solucionar esto hacemos lo siguiente: */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    
    /*Lo que hacemos con await Promise.all() es juntar ambas funciones asincronas y hacer que trabajen en paralelo,
    lo malo de esto es que si falla una fallan las 2, pero si todo sale bien, el tiempo de respuesta se resta hasta un
    50%. Tambien usamos la desestructuracion de array y nombramos al primer objeto del array "total" y al 2do "usuarios"*/

    res.json({total,usuarios});

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

    res.json(usuario);

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

    res.json(usuario);

}

export const usuariosDelete = async(req, res = response) =>{
    /*Hay 2 formas de borrar un usuario de una BD, una es borrando literamente el usuario de la BD y con este
    toda la informacion que alguna vez hubo esto no es recomendable ya que algun momento podemos necestiar algun
    registro del usuario, de todas formas, asi es como se hace:*/

    const { id } = req.params

    // const borrarUsuario = await Usuario.findByIdAndDelete( id )

    /*Pero lo vamos hacer como la segunda opcion, que sería asi:*/

    const borrarUsuarioNo = await Usuario.findByIdAndUpdate( id, {estado: false} )
    // De esta forma solo cambiamos el estado del usuario a "false", con esto hacemos que para el front no sea visible
    // pero la el usuario con toda su informacion sigue en la BD.

    res.json({
        id, 
        borrarUsuarioNo
    });

}

export const usuariosPatch = (req, res = response) =>{

    res.json({
        msg: "patch API - controlador"
    });

}