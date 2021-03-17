const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserController = require('./controllers/User');
const User = new UserController();

const RoomController = require('./controllers/Room');
const Room = new RoomController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/users', User.index);
app.get('/users/check', User.check);

app.get('/rooms', Room.index);
app.get('/rooms/userid', Room.readByUserID);

app.listen(7777, () => {
    console.log('Server has started ...');
});