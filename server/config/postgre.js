const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_SQL_NAME, 'event', process.env.DB_SQL_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_SQL_HOST,
  port: process.env.DB_SQL_PORT,
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Postgre Connected');
  })
  .catch(err => {
    throw new Error('Error SQL connection', err);
  });

module.exports = sequelize;
