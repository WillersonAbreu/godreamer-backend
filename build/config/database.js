"use strict";module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'b3e5bd7292539b', //process.env.DB_USERNAME,
  password: 'caf6ac24', //process.env.DB_PASSWORD,
  database: 'heroku_af17a7528fb1765', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

//mysql://b3e5bd7292539b:caf6ac24@us-cdbr-east-06.cleardb.net/heroku_af17a7528fb1765?reconnect=true
