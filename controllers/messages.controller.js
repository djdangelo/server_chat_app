const Messages = require('../models/messages.model');

const messagesController = {};

messagesController.getMessages = async (req, res) => {
    try {
        const id = req.id;
        const fromId = req.params.fromId;

        const lastMessages = await Messages.find({
            $or: [{ fromMessage: id, forMessage: fromId }, { fromMessage: fromId, forMessage: id }]
        }).sort({ createAt: 'desc' }).limit(30);

        return res.status(200).json(
            {
                OK: true,
                msg: 'List of messages',
                messages: lastMessages
            }
        );

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            OK: false,
            msg: 'Error server.'
        });
    }
}

module.exports = messagesController;