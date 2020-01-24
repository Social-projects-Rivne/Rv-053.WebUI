const express = require('express'); // setup express application
const bodyParser = require('body-parser');
const config = require('config');
const app = express();

const db = require('./models');

const auth = require('./routes/auth.routes');
const passportSetup = require('./config/passport-setup');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use('/api/auth', auth);
app.use('/api/users', require('./routes/user.routes'));

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
