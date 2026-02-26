/**
 * Configuración de conexión a MongoDB.
 * Intenta conectar a la URI almacenada en MONGODB_URI o al servidor Atlas.
 * Si falla y no hay variable de entorno, reintenta con una instancia local.
 * Exporta el objeto mongoose para usar en otros módulos.
 */
const mongoose = require('mongoose');
require('dotenv').config();

const LOCAL_URI = 'mongodb://127.0.0.1:27017/ManaMarket';
const URI = process.env.MONGODB_URI || LOCAL_URI;

mongoose.connect(URI)
    .then(() => console.log(`DB is connected (${URI.includes('127.0.0.1') ? 'local' : 'atlas'})`))
    .catch(async (err) => {
        if (!process.env.MONGODB_URI) {
            console.error('Atlas connection failed:', err.message);
            console.log('Trying local MongoDB at mongodb://127.0.0.1:27017/ManaMarket ...');
            try {
                await mongoose.connect(LOCAL_URI);
                console.log('DB is connected (local fallback)');
            } catch (localErr) {
                console.error('Local MongoDB connection failed:', localErr.message);
            }
            return;
        }

        console.error('Database connection error:', err.message);
    });

module.exports = mongoose;