module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'bfd3a8893594ac', //process.env.DB_USERNAME,
  password: '5d0fb43e', //process.env.DB_PASSWORD,
  database: 'heroku_932b6b6515436d6', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// mysql://bfd3a8893594ac:5d0fb43e@us-cdbr-east-06.cleardb.net/heroku_932b6b6515436d6?reconnect=true
