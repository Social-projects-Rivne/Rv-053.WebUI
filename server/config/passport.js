const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models').users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        let isPassword;
        const user = await User.findOne({
          where: {
            email
          }
        });

        if (user) {
          isPassword = bcrypt.compareSync(password, user.password);
        }
        
        if (user && user.status_id == 3) {
          return done(null, false, {
            message: 'Please confirm email'
          });
        }
        
        if (!user || !isPassword) {
          return done(null, false, {
            message: 'invalid email or password'
          });
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
