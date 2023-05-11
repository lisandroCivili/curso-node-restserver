import mongoose from 'mongoose';

// Funcion para crear la conexion con la base de datos.
export const dbConnection = async() =>{
    // Try Catch por las du no se conecta
    try {
        // Aca conectamos con la url de nuestra db
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Base de datos online');
        
    } catch (error) {
        throw new Error('Error al inicar base de datos');
    }


}
