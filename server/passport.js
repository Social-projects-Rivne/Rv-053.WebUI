const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models').users;
const bcrypt = require('bcryptjs');

//LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
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
