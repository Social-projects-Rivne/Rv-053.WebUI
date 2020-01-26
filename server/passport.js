const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./config/keys');
const config = require('config');
const User = require('./models').users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: 'http://localhost:5001/api/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      // pasport callback
      try {
        const user = await User.findOne({
          where: { email: profile._json.email },
        });
        // console.log(profile);
        if (!user) {
          const newUser = await User.create({
            email: profile._json.email,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            avatar: profile._json.picture,
            status_id: 1,
          });
          console.log(newUser);
          return done(null, newUser);
        }
        console.log('Registred user, fetch from DB');
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        //find the user for given email
        console.log('Passport Local stategy start');
        const user = await User.findOne({ where: { email } });
        //console.log(user);
        //If not user
        if (!user) {
          return done(null, false);
        }
        //Check the password
        const isPassword = bcrypt.compareSync(password, user.password);
        //If not, handle it
        if (!isPassword) {
          return done(null, false);
        }
        //If password is right, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
