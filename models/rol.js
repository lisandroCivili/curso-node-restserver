import { Schema, model } from 'mongoose';

const RoleSchema = Schema({

    rol: {
        type: String,
        required: [true, 'El rol ingresado no esta permitido']
    }

});

const Rol = model('Role', RoleSchema)

export {
    Rol
}