import { validationResult } from 'express-validator';

// Hacemos un middleware ya que este control lo vamos a usar muchas veces, para no estar copiando y pegando.

export const validarCampos = (req, res, next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    // "next()" sirve para decirle que si todo esta bien, en este caso si pasa el middleware, siga con lo siguiente :)
    next();

}