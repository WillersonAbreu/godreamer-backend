"use strict";module.exports = {
  dialect: 'mariadb',
  host: '127.0.0.1', //process.env.DB_HOST,
  username: 'root', //process.env.DB_USERNAME,
  password: 'mysql', //process.env.DB_PASSWORD,
  database: 'godreamer', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
