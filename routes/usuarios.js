import { Router } from 'express';
import { usuariosGet, usuariosPut, usuariosPost,
         usuariosDelete, usuariosPatch} from '../controllers/usuarios.js';

//El metodo Router() crear las rutas hacia donde especifiquemos, en este caso hacia la raiz de la aplicacion ('/')
export const router = Router();

//Aca derivamos las rutas con su respectivo metodo, lo segundo son funciones que se aplican cuando se hace la solicitud
//a esa ruta, estas funciones son controladores.
router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

