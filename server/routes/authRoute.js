const express = require('express');
const passport = require('passport');
const passportConf = require('../passport');
const AuthController = require('../controllers/authController');
const passportSingIn = passport.authenticate('local', { session: false });
const passportGoogle = passport.authenticate('google', {
	scope: ['profile', 'email'],
	session: false,
});
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/register', AuthController.signUp);

router.post('/login', passportSingIn, AuthController.signIn);

router.post('/logout', auth, AuthController.signOut);

router.post('/check', auth, AuthController.checkAuth);
//router.get('/refresh', passportJWT, AuthController.refreshAuth);

router.get('/google', passportGoogle);
router.get('/google/redirect', passportGoogle, AuthController.signIn);

module.exports = router;
