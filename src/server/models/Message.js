const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    text: {
        type: String
    }
});

module.exports = model('Message', schema);