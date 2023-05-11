    import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

                    /*↓↓↓LO QUE HACEMOS A CONTINUACION ES PARA NO MOSTRAR LA PASS Y LA VERSION↓↓↓*/
// Lo que hacemos a continuacion se llama "sobreescribr" una función, en este caso la funcion toJSON, que sirve para
// convertir objetos planos JS en json que a su vez sirven para ser enviados via solicitudes http.
// Esto se debe hacer si o si con funciones normales y no funciones flecha, ya que se hace uso del "this", y este objeto
// no sirve en las func. flecha ya que no hace referencia al objeto que lo contiene.

// Paso a paso de lo que se hace dentro de la function():
// PASO 1: el this.toObject() convierte el "UsuarioSchema" en un objeto plano de js, es decir que no hace referencia a 
// ningun prototipo ni propiedades ajenas al objeto.
// PASO 2: de ese objecto desestructuramos __v y password, despues con el operador 'rest' le asignamos la vble "usuario"
// a las demas llaves.
// PASO 3: retornamos la vlbe usuario con las llaves que queremos mantener y que se van a mostrar.
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


// Aca guardamos el modelo completo del esquema, en el 1er parametro va el nombre de la coleccion, mongoose por defecto
// le agrega una "s" al final (quedaría "usuarioS"), y en el 2do el esquema.
const Usuario = model('Usuario', UsuarioSchema);
export {
    Usuario
}