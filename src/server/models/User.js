const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    socket_id: {
        type: String,
        required: true
    },
    administrator: {
        type: Boolean,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    }
});

module.exports = model('User', schema);