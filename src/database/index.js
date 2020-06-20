import Sequelize from 'sequelize';

// Database Configuration
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import ProfileImage from '../app/models/ProfileImage';
import Post from '../app/models/Post';
import GroupPost from '../app/models/GroupPost';
import Friendship from '../app/models/Friendship';
import FollowGroup from '../app/models/FollowGroup';
import UserInfoDonation from '../app/models/UserInfoDonation';
import Donation from '../app/models/Donation';
import Group from '../app/models/Group';
import ChatConversation from '../app/models/ChatConversation';
import ChatMessage from '../app/models/ChatMessage';

// Array with all models
const models = [
  User,
  ProfileImage,
  Post,
  GroupPost,
  Friendship,
  Group,
  FollowGroup,
  UserInfoDonation,
  Donation,
  ChatConversation,
  ChatMessage,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
