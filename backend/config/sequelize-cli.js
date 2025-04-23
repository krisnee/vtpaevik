require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATANAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 8080,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATANAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 8080
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATANAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 8080
  }
};