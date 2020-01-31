const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/authController");
// const passportConf = require("../passport");
// const auth = require("../middlewares/authorization");

const router = express.Router();

const passportSingIn = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: info.message
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// const passportGoogle = passport.authenticate("google", {
//   scope: ["profile", "email"],
//   session: false
// });

router.post("/auth/register", AuthController.signUp);

router.post("/auth/login", passportSingIn, AuthController.signIn);

router.post("/auth/logout", AuthController.signOut);

router.post("/auth/check", AuthController.checkAuth);
router.post("/auth/refresh", AuthController.refreshTokens);

// router.get("auth/google", passportGoogle);
// router.get("auth/google/redirect", passportGoogle, AuthController.signIn);

module.exports = router;