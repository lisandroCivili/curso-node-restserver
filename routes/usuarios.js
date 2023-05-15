import { Router } from 'express';
import { usuariosGet, usuariosPut, usuariosPost,
         usuariosDelete, usuariosPatch} from '../controllers/usuarios.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/fieldValidate.js';
import { esRolValido, existeMail, existeUsuarioPorId } from '../helpers/dbValidtors.js';

//El metodo Router() crear las rutas hacia donde especifiquemos, en este caso la ruta que contiene es:
// '/api/usuarios'
export const router = Router();

//Aca derivamos las rutas con su respectivo metodo, lo segundo son funciones que se aplican cuando se hace la solicitud
//a esa ruta, estas funciones son controladores.

/*Con el router, el patch completo de cada metodo seria algo asi: localhost:8080/router/ donde router es '/api/usuarios'*/

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un ID valido de MongoDB').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosPut)

// En la ruta, se puede poner 3 argumentos, en ese caso el 2 sería un middleware y el 3ro es el controlador.
// Hacemos uso del paquete "check" de express que es un middleware, le decimos que argumento queremos chequear,
// en este caso chequeamos el correo, dsp del argumento va el msj de error en caso de no pasar el controlador.
// al ultimo va el "isxxxx()" según lo q estemos chequeando. ESTO APLICA PARA TODOS LOS METODOS.
router.post('/',[

    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El valor ingresado no tiene aspecto de correo').isEmail(),
    check('correo').custom( existeMail ),
    check('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // ↓↓↓Aca chequeamos los roles contra la base de datos, es decir en la bd creamos 3 roles que serán los permitidos
    // "custom()" es una chequeo personalizado, dentro de el hacemos una funcion asincrona, esperando el rol q viene
    // en la "req", con "findOne()" chequemos que sea un rol que este en la bd si es así pasa, si no largamos el error
    check('rol').custom( esRolValido ),
    validarCampos
    //  Pasamos la func para que nos muestre todos los errores.

], usuariosPost)

router.delete('/:id',[
    check('id', 'No es un ID valido de MongoDB').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

