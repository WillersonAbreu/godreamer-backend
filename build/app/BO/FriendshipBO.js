"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Friendship = require('../models/Friendship'); var _Friendship2 = _interopRequireDefault(_Friendship);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class FriendshipBO {
  async getFriends(user_id) {
    try {
      const friends = await _Friendship2.default.findAll({
        where: { user_id },
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        include: [
          {
            model: _User2.default,
          },
        ],
        order: [['created_at', 'DESC']],
      });
      return friends;
    } catch (error) {
      return [];
    }
  }
}

exports. default = new FriendshipBO();
