"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _sequelize = require('sequelize');

// Models
var _Post = require('../models/Post'); var _Post2 = _interopRequireDefault(_Post);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _FriendshipBO = require('../BO/FriendshipBO'); var _FriendshipBO2 = _interopRequireDefault(_FriendshipBO);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _FollowGroup = require('../models/FollowGroup'); var _FollowGroup2 = _interopRequireDefault(_FollowGroup);
var _Friendship = require('../models/Friendship'); var _Friendship2 = _interopRequireDefault(_Friendship);
var _ProfileImage = require('../models/ProfileImage'); var _ProfileImage2 = _interopRequireDefault(_ProfileImage);

// Controllers

class FeedController {
  async getPosts(req, res) {
    const { userId } = req.params;

    try {
      const friends = await _FriendshipBO2.default.getFriends(userId);
      let users = [];

      users.push({ user_id: userId });

      await friends.map((friend) => {
        users.push({ user_id: friend.id_user });
      });

      const condition = {
        [_sequelize.Op.or]: users,
      };

      const posts = await _Post2.default.findAll({
        where: condition,
        include: [
          {
            model: _User2.default,
            include: [
              {
                model: _ProfileImage2.default,
                attributes: {
                  exclude: [
                    'id',
                    'name',
                    'user_id',
                    'is_active',
                    'createdAt',
                    'updatedAt',
                  ],
                },
              },
            ],
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'is_active',
                'user_type',
                'birthdate',
                'password',
                'email',
              ],
            },
          },
        ],
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        order: [['created_at', 'DESC']],
      });
      return res.status(200).json({ posts });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async getGroups(req, res) {
    const { userId: user_id } = req.params;

    try {
      const followedGroups = await _FollowGroup2.default.findAll({
        where: {
          user_id,
        },
      });
      return res.status(200).json({ followedGroups });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getUserPosts(req, res) {
    const { userId } = req.params;

    try {
      const getPosts = await _Post2.default.findAll({
        where: {
          user_id: userId,
        },
        order: [['updated_at', 'DESC']],
      });

      return res.status(200).json({ post: getPosts });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getFriends(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const friends = await _FriendshipBO2.default.getFriends(user_id);

      let friendsId = friends.map((friend) => friend.id_user);

      let users = [];

      async function asyncForEach(friendsId) {
        for (let index = 0; index < friendsId.length; index++) {
          users.push(
            await _User2.default.findOne({
              where: { id: friendsId[index] },
              attributes: {
                exclude: [
                  'password',
                  'is_active',
                  'createdAt',
                  'updatedAt',
                  'profile_image_id',
                ],
              },
              include: [
                {
                  model: _ProfileImage2.default,
                  attributes: {
                    exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
                  },
                },
              ],
            })
          );
        }
      }
      await asyncForEach(friendsId);

      return res.status(200).json({ friends: users });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

exports. default = new FeedController();
