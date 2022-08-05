const { model, Schema } = require('mongoose');

const MessageSchema = Schema({
    fromMessage: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    forMessage: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messageBody: {
        type: String,
        required: true
    }

}, { timestamps: true });

MessageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('message', MessageSchema);