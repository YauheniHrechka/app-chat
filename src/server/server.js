const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const http = require('http').Server(app);
const io = require('socket.io')(http);

const UserController = require('./controllers/User');
const UserModel = require('./models/User');
const User = new UserController();

const RoomController = require('./controllers/Room');
const Room = new RoomController();

const MessageController = require('./controllers/Message');
const Message = new MessageController();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/users', User.index);
app.get('/users/check', User.check);

app.get('/rooms', Room.index);
app.get('/rooms/userid', Room.readByUserID);

app.get('/messages/roomid', Message.readByRoomID);

let socketRooms = [];

io.on('connection', (socket) => {

    socket.on('USER:ONLINE', ({ rooms, user }) => {
        try {
            User.update({ _id: mongoose.Types.ObjectId(user._id) }, { $set: { online: true, socket_id: socket.id } });
        } catch (error) {
            console.error(error);
        }
        // connecting to the rooms ... 
        rooms.forEach(({ _id }) => {
            socket.join(_id);
            io.sockets.in(_id).emit('USER:ONLINE', {
                _id,
                socket_id: socket.id,
                user
            });
        });

        [, ...socketRooms] = [...socket.rooms.values()];
    })

    socket.on('disconnect', () => {
        UserModel.find({ socket_id: socket.id })
            .then(users => {
                if (users) {
                    socketRooms.forEach(_id => io.sockets.in(_id).emit('USER:OFFLINE', {
                        _id,
                        socket_id: socket.id,
                        user: users[0]
                    }));
                }
            });

        try {
            User.update({ socket_id: socket.id }, { $set: { online: false, socket_id: '' } });
        } catch (error) {
            console.error(error);
        }
    });
})

http.listen(7777, () => {
    console.log('Server has started ...');
});