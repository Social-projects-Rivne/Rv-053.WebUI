require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const cookieParser = require('cookie-parser');
const adminAuth = require('./middlewares/adminAuthorization');

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_HOST
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/eventRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/tags', require('./routes/tagsRoute'));
app.use('/api/adminpanel', adminAuth, require('./routes/adminRoute'));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await db.sequelize
      .sync()
      .then(() => {
        app.listen(PORT, () =>
          console.log(`App has been started on port ${PORT}...`)
        );
      })
      .catch(err => console.error(err.message));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
