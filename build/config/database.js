"use strict";module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'bf89914ff1dcda', //process.env.DB_USERNAME,
  password: 'd5eb3e9b', //process.env.DB_PASSWORD,
  database: 'heroku_7aa8d7b1ad65a5c', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

//mysql://bf89914ff1dcda:d5eb3e9b@us-cdbr-east-06.cleardb.net/heroku_7aa8d7b1ad65a5c?reconnect=true
