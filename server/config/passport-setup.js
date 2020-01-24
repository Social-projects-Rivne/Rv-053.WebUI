const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models').user;

passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: 'http://localhost:5001/api/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // pasport callback
      // console.log(profile);
      // console.log(accessToken);

      const userObj = {
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        avatar: profile._json.picture
      };
      console.log(userObj);
      User.create({
        email: userObj.email,
        password: 'something',
        status_id: 1,
        first_name: userObj.first_name,
        last_name: userObj.last_name
      });
    }
  )
);
