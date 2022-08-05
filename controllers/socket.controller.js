const Users = require('../models/users.model');
const Messages = require('../models/messages.model');
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
socketController.saveMessages = async (data) => {
    try {
        const message = new Messages(data);
        await message.save();
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = socketController;