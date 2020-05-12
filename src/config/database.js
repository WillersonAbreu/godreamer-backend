module.exports = {
  dialect: 'mariadb',
  host: 'us-cdbr-east-06.cleardb.net', //process.env.DB_HOST,
  username: 'b32e64636ee191', //process.env.DB_USERNAME,
  password: '1ab8bbd4', //process.env.DB_PASSWORD,
  database: 'heroku_7392d3432009963', //process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// mysql://b32e64636ee191:1ab8bbd4@us-cdbr-east-06.cleardb.net/heroku_7392d3432009963?reconnect=true
