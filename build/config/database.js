"use strict";module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'bf25eb18a42cba', //process.env.DB_USERNAME,
  password: '304722c3', //process.env.DB_PASSWORD,
  database: 'heroku_5e0352d77572eeb', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

//mysql://bf25eb18a42cba:304722c3@us-cdbr-east-06.cleardb.net/heroku_5e0352d77572eeb?reconnect=true
