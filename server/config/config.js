//=======================
// Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
// Vencimiento del token
//=======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';

//=======================
// SEED de autenticación
//=======================

process.env.SEED = process.env.SEED || 'Seed@dEDesarrollo';

//=======================
// Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
// Base de datos
//=======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cmarthacenteno';


} else {
    urlDB = process.env.MONGO_URI;

}
process.env.URLDB = urlDB;

//=======================
// Google Client Id
//=======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '817826885200-ukf4o17nacttp91555kl6ilci4cbjluv.apps.googleusercontent.com';