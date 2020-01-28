const express = require("express");
const passport = require("passport");
const passportConf = require("../passport");
const AuthController = require("../controllers/authController");
const passportSingIn = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const passportGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false
});
const router = express.Router();
const auth = require("../middlewares/authorization");

router.post("/register", AuthController.signUp);

router.post("/login", passportSingIn, AuthController.signIn);

router.post("/logout", AuthController.signOut);

router.post("/check", AuthController.checkAuth);
router.post("/refresh", AuthController.refreshTokens);

router.get("/google", passportGoogle);
router.get("/google/redirect", passportGoogle, AuthController.signIn);

module.exports = router;
