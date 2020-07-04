"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Post = require('../models/Post'); var _Post2 = _interopRequireDefault(_Post);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserBO {
  async getUserPost({ str_post, user_id, url_image, url_video }) {
    try {
      const post = await _Post2.default.findOne({
        where: { str_post, user_id, url_image, url_video },
        include: {
          model: _User2.default,
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
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        order: [['created_at', 'DESC']],
      });
      return post;
    } catch (error) {
      return [];
    }
  }
}

exports. default = new UserBO();
