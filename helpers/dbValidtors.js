import { response } from 'express';
import { Rol } from '../models/rol.js';
import { Usuario } from '../models/usuario.js';

const res = response;

export const esRolValido = async(rol = '') => {

    const existeRol = await Rol.findOne( {rol});
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    } 

}

export const existeMail = async( correo = '' )=> {

    const mailBD = await Usuario.findOne({ correo });
    if ( mailBD ) {
        throw new Error(`Ese correo ya esta registrado`);
    }

}

export const existeUsuarioPorId = async( id )=> {

    const usuarioId = await Usuario.findById( id );
    if ( !usuarioId ) {
        throw new Error(`No existe usuario con el id: ${ id }`);
    }

}




                            /*POR QUE NO SE PUEDE USAR RETURN EN FUNCIONES ASINCRONAS*/
/*En las funciones asincronas no se puede usar "return" ya que al momento de finalizar la operacion (con return), la misma
no se habrá completado. En este caso se puede usar "throw" ya que al recibir un error, la operación se traslada al "catch"
mas proximo*/