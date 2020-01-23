const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models').users;
const passport = require('passport');
const authenticate = require('../middlewares/authenticate');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const router = express.Router();
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

require('../config/configPassport');
router.use(passport.initialize());
router.use(passport.session());

//const sequelize = require('../config/postgre');

//const userStatus = sequelize.query(`SELECT email FROM users WHERE id>1`);

router.post('/register', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcryptjs.hash(req.body.password, saltRounds, (err, hash) => {
          User.create({
            ...req.body,
            password: hash,
            status_id: 1
          })
            .then(user => {
              res.setHeader('Content-Type', 'application/json');
              res.status(201).json({
                message: `User ${user.email} has been created successful`
              });
            })
            .catch(err => {
              res.status(500).send('error: ' + err);
            });
        });
      } else {
        res.status(200).json({ error: 'User already exists' });
      }
    })
    .catch(err => {
      res.status(500).send('error: ' + err);
    });
});

module.exports = router;
