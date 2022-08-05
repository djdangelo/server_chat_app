const { io } = require('../index');
const jwtController = require('../helpers/jwt');
const socketController = require('../controllers/socket.controller');

io.on('connection', client => {

    const [ valid, id ] = jwtController.verifyTokenFromSocket(client.handshake.headers['x-token']);
    console.log('Cliente conectado');
    if (!valid) { return client.disconnect(); }
    socketController.isUserConnected(id);

    client.join(id);
    client.on('personal-message', async (payload) => {
        await socketController.saveMessages(payload);
        io.to(payload.For).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        socketController.isUserDisconnected(id);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
