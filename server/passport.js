const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./config/keys');
const config = require('config');
const User = require('./models').users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//JSON WEB TOKEN STRATEGY
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			//jwtFromRequest: ExtractJwt.fromBodyField,
			secretOrKey: config.get('JWT_SECRET'),
			passReqToCallback: true,
		},
		async (req, payload, done) => {
			console.log('Passport JWT stategy start');
			console.log(payload.sub);
			console.log(payload.sub.email);
			try {
				//Find the user specified in token (email)
				const user = await User.findOne({
					where: { email: payload.sub.email },
				});
				//If user doesn't exist handle it
				if (!user) {
					return done(null, false);
				}
				//Otherwise, return the user
				req.user = user;
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
				const user = await User.findOne({ email });
				console.log('Passport Local stategy start');
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
					User.create({
						email: profile._json.email,
						first_name: profile._json.given_name,
						last_name: profile._json.family_name,
						avatar: profile._json.picture,
					}).then(newUser => {
						console.log('New user, create in DB');
						return done(null, newUser);
					});
				}
				console.log('Registred user, fetch from DB');
				return done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

//serialize
passport.serializeUser(function(user, done) {
	console.log('Serialize:' + user.email);
	done(null, user.email);
});
// deserialize user
passport.deserializeUser(function(email, done) {
	User.findOne({ where: { email } }).then(function(user) {
		console.log('Deserialize:' + user);
		console.log('Deserialize:' + user.get());
		if (user) {
			done(null, user.get());
		} else {
			done(user.errors, null);
		}
	});
});
