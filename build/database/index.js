"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Database Configuration
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

// Models
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _ProfileImage = require('../app/models/ProfileImage'); var _ProfileImage2 = _interopRequireDefault(_ProfileImage);
var _Post = require('../app/models/Post'); var _Post2 = _interopRequireDefault(_Post);
var _GroupPost = require('../app/models/GroupPost'); var _GroupPost2 = _interopRequireDefault(_GroupPost);
var _Friendship = require('../app/models/Friendship'); var _Friendship2 = _interopRequireDefault(_Friendship);
var _FollowGroup = require('../app/models/FollowGroup'); var _FollowGroup2 = _interopRequireDefault(_FollowGroup);
var _UserInfoDonation = require('../app/models/UserInfoDonation'); var _UserInfoDonation2 = _interopRequireDefault(_UserInfoDonation);
var _Donation = require('../app/models/Donation'); var _Donation2 = _interopRequireDefault(_Donation);
var _Group = require('../app/models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _ChatConversation = require('../app/models/ChatConversation'); var _ChatConversation2 = _interopRequireDefault(_ChatConversation);
var _ChatMessage = require('../app/models/ChatMessage'); var _ChatMessage2 = _interopRequireDefault(_ChatMessage);

// Array with all models
const models = [
  _User2.default,
  _ProfileImage2.default,
  _Post2.default,
  _GroupPost2.default,
  _Friendship2.default,
  _Group2.default,
  _FollowGroup2.default,
  _UserInfoDonation2.default,
  _Donation2.default,
  _ChatConversation2.default,
  _ChatMessage2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

exports. default = new Database();
