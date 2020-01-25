const User = require('../models').user;

module.exports = {
    getUserList(req, res) {
        User.findAll({
            raw: true
        }).then(data => {
            res.send(data);
        }).catch(err => console.log(err));
    },
}