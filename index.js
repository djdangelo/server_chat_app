const express = require('express');
const { dbConnection } = require('./database/config');
const path = require('path');
require('dotenv').config();
dbConnection();

// App de Express
const app = express();
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
app.use('/api/users', require('./router/users.routes'));
app.use('/api/auth', require('./router/auth.routes'));
app.use('/api/messages', require('./router/messages.routes'));
app.use('/*', async (req, res) => {
    return res.status(400).json({
        OK: false,
        msg: `This route is not available.`
    });
});


module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );





server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


