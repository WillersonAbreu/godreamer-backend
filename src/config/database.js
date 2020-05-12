module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'bceec686597064', //process.env.DB_USERNAME,
  password: 'aee06114', //process.env.DB_PASSWORD,
  database: 'heroku_ca51fad5f59f181', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// mysql://bceec686597064:aee06114@us-cdbr-east-06.cleardb.net/heroku_ca51fad5f59f181?reconnect=true
