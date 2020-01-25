const express = require('express');
const passport = require('passport');
require('../passport');
const UserController = require('../controllers/authController');
const passportSingIn = passport.authenticate('local', { session: false });
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/register', UserController.signUp);

router.post('/login', passportSingIn, UserController.signIn);

router.post('/logout', auth, UserController.signOut);

router.post('/check', auth, UserController.checkAuth);

module.exports = router;
