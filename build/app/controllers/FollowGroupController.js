"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

// Models
var _FollowGroup = require('../models/FollowGroup'); var _FollowGroup2 = _interopRequireDefault(_FollowGroup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);

class FollowGroupController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const followedGroups = await _FollowGroup2.default.findAll({
        where: {
          user_id,
        },
        include: [
          {
            model: _User2.default,
            attributes: {
              exclude: ['id', 'password', 'birthdate', 'user_type', 'is_active', 'createdAt', 'updatedAt']
            }
          },
          {
            model: _Group2.default,
            attributes: {
              exclude: ['id', 'user_id', 'createdAt', 'updatedAt']
            }
          }
        ]
      });
      return res.status(200).json({ followedGroups });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const { group_id } = req.body;
    const user_id = decodedToken.id;

    try {
      const followedGroup = await _FollowGroup2.default.findOne({
        where: {
          user_id,
          group_id,
        },
      });

      if (!followedGroup)
        return res
          .status(401)
          .json({ error: 'You aren`t following this group yet' });

      await followedGroup.destroy();

      return res
        .status(200)
        .json({ message: 'You aren`t following this group now' }); //'You aren`t following this group now'
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const { group_id } = req.body;
    const user_id = decodedToken.id;

    try {
      await _FollowGroup2.default.create({ group_id, user_id });
      return res
        .status(200)
        .json({ message: 'You are following this group now' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

exports. default = new FollowGroupController();
