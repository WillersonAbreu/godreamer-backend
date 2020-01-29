import Sequelize from 'sequelize';

// Database Configuration
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import ProfileImage from '../app/models/ProfileImage';
import Post from '../app/models/Post';

// Array with all models
const models = [User, ProfileImage, Post];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
