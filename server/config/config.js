require("dotenv").config();

module.exports = {
  sql: {
    name: process.env.DB_SQL_NAME,
    password: process.env.DB_SQL_PASSWORD,
    host: process.env.DB_SQL_HOST,
    port: process.env.DB_SQL_PORT
  },
  jwtConf: {
    secret: "VeryBigSecret",
    expiresIn: 12000,
    refreshSecret: "VeryBigRefreshSecret",
    refreshExpiresIn: 36000
  }
};
