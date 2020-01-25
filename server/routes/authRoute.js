const express = require('express');
const passport = require('passport');
const passportConf = require('../passport');
const AuthController = require('../controllers/authController');
const passportSingIn = passport.authenticate('local', { session: true });
const passportJWT = passport.authenticate('jwt', { session: true });
const passportGoogle = passport.authenticate('google', {
	scope: ['profile', 'email'],
	session: true,
});
const router = express.Router();

router.post('/register', AuthController.signUp);

router.post('/login', passportSingIn, AuthController.signIn);

router.post('/logout', passportJWT, AuthController.signOut);

router.post('/check', passportJWT, AuthController.checkAuth);
//router.get('/refresh', passportJWT, AuthController.refreshAuth);

router.get('/google', passportGoogle);

router.get('/google/redirect', passportGoogle, AuthController.signIn);

module.exports = router;
