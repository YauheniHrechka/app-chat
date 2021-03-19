const User = require('../models/User');

class UserContriller {

    index(req, res) {
        User.find().then((err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }

    read(req, res) {

    }

    check(req, res) {
        User.findOne(req.query, {
            'password': 0,
            'administrator': 0
        }).lean()
            .then((err, user) => {
                if (err) {
                    res.send(err);
                }
                try {
                    res.json(user);
                } catch (error) {
                    res.status(500);
                }
            })
    }

    update(req, set) {
        User.updateOne(req, set, (err, res) => {
            if (err) {
                res.send(err);
            }
        });
    }
}

module.exports = UserContriller;