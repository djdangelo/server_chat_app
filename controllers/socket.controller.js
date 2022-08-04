const Users = require('../models/users.model');

const socketController = {};

socketController.isUserConnected = async (id) => {
    try {
        const user = await Users.findById(id);
        user.online = true;
        await user.save();
        return user;
    } catch (e) {
        console.log(e);
    }
};
socketController.isUserDisconnected = async (id) => {
    try {
        const user = await Users.findById(id);
        user.online = false;
        await user.save();
        return user;
    } catch (e) {
        console.log(e);
    }
};

module.exports = socketController;