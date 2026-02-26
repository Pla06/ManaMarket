/**
 * Main backend server startup file.
 * Configura Express, middlewares y rutas, y arranca el servidor.
 * - usa morgan para logging, cors para cross‑origin y express.json para
 *   parsear el cuerpo de las peticiones.
 * - conecta con la base de datos en ./database.
 * - monta routers para /api/v1/cards, /users, /carts, /orders.
 * - inicia el servidor en el puerto especificado por PORT o 3000.
 */
// console.log("Hola desde el backend");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('./database');
const {json} = require('express');

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/cards', require('./routes/card.route'));
app.use('/api/v1/movies', require('./routes/card.route')); // Backward compatibility
app.use('/api/v1/users', require('./routes/user.route'));
app.use('/api/v1/carts', require('./routes/cart.route'));
app.use('/api/v1/orders', require('./routes/order.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/cards/'));

//Settings
app.set('port', process.env.PORT || 3000);
//iniciar el server
app.listen(app.get('port'),() =>{
    console.log('Server on port', app.get('port'));
})