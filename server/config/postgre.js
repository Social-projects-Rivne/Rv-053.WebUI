const Sequelize = require("sequelize");
const { sql } = require("./config");
require("dotenv").config();

const sequelize = new Sequelize(sql.name, "event", sql.password, {
  dialect: "postgres",
  host: sql.host,
  port: sql.port,
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Postgre Connected");
  })
  .catch(err => {
    throw new Error("Error SQL connection", err);
  });

module.exports = sequelize;
