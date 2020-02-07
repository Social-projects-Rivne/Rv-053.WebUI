const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const db = require('./models');
const auth = require('./middlewares/authorization');
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/eventRoute'));

//Example:
//Check if user authorized
//app.use('/api/users', auth, require('./routes/usersRoute'));

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