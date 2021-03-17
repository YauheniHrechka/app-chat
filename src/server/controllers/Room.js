const mongoose = require('mongoose');
const Room = require('../models/Room');

class RoomController {

    index(req, res) {
        Room.find({}, { 'users': false })
            .then((err, rooms) => {
                if (err) {
                    res.send(err);
                }
                try {
                    res.json(rooms);
                } catch (error) {
                    res.status(500);
                }
            })
            .catch(err => res.send(err));
    }

    readByUserID(req, res) {
        Room.aggregate([
            {
                $match: { users: { $in: [mongoose.Types.ObjectId(req.query.id)] } }
            },
            {
                $lookup: { from: "users", localField: "users", foreignField: "_id", as: "users" }
            }, {
                $project: { _id: 1, name: 1, "users._id": 1, "users.name": 1, "users.color": 1, "users.letter": 1, "users.online": 1, "users.socket_id": 1 }
            }
        ]).then((err, rooms) => {
            if (err) {
                res.send(err);
            }
            try {
                res.json(rooms);
            } catch (error) {
                res.status(500);
            }
        })
            .catch(err => res.send(err));
    }
}

module.exports = RoomController;