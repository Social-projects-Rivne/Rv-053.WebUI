const express = require('express');
const passport = require('passport');
const passportConf = require('../passport');
const UserController = require('../controllers/authController');
const passportSingIn = passport.authenticate('local', { session: true });
const passportJWT = passport.authenticate('jwt', { session: true });
const router = express.Router();

router.post('/register', UserController.signUp);

router.post('/login', passportSingIn, UserController.signIn);

router.post('/logout', passportJWT, UserController.signOut);

router.post('/check', passportJWT, UserController.checkAuth);
//router.get('/refresh', passportJWT, UserController.refreshAuth);

module.exports = router;
