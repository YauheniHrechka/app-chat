const mongoose = require('mongoose');
const Message = require('../models/Message');

class MessageController {

    readByRoomID(req, res) {
        const rooms_id = req.query.rooms.map(room => ({ room_id: mongoose.Types.ObjectId(room) }));
        Message.aggregate([
            {
                $match: { $or: rooms_id }
            }, {
                $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" }
            }, {
                $unwind: "$user"
            }, {
                $project: { _id: 1, room_id: 1, text: 1, "user._id": 1, "user.name": 1, "user.color": 1, "user.letter": 1 }
            }
        ]).then((err, messages) => {
            if (err) {
                res.send(err);
            }
            try {
                res.json(messages);
            } catch (error) {
                res.status(500);
            }
        })
    }
}

module.exports = MessageController;