const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const db = require('./models');
const passport = require('passport');

app.use(cors());
// Parse incoming requests data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(require('cookie-parser')());

//TODO: configure values
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routes/authRoute'));

// set port
const PORT = config.get('port') || 5000;

async function start() {
  try {
    await db.sequelize
      .sync()
      .then(() => {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
      })
      .catch(err => console.error(err.message));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
