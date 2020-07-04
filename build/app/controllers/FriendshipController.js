"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

// Models
var _Friendship = require('../models/Friendship'); var _Friendship2 = _interopRequireDefault(_Friendship);
var _FriendshipBO = require('../BO/FriendshipBO'); var _FriendshipBO2 = _interopRequireDefault(_FriendshipBO);
var _ChatConversation = require('../models/ChatConversation'); var _ChatConversation2 = _interopRequireDefault(_ChatConversation);

class FriendshipController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const friends = await _FriendshipBO2.default.getFriends(user_id);
      return res.status(200).json({ friends });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const { id_user } = req.body;
    const user_id = decodedToken.id;

    const loggedUserData = {
      user_id,
      id_user,
      is_active: true,
    };
    const friendUserData = {
      user_id: id_user,
      id_user: user_id,
    };

    try {
      const isFriend = await _Friendship2.default.findAll({
        where: { user_id: user_id, id_user: id_user },
      });

      const isFriendConfirm = await _Friendship2.default.findAll({
        where: { user_id: id_user, id_user: user_id },
      });

      if (isFriend[0] && isFriendConfirm[0]) {
        if (isFriend[0].id + 1 === isFriendConfirm[0].id) {
          return res.status(400).json({ error: 'Vocês já são amigos' });
        }
      }

      await _Friendship2.default.create(loggedUserData);
      await _Friendship2.default.create(friendUserData);

      await _ChatConversation2.default.create({
        user_id,
        id_user,
      });

      await _ChatConversation2.default.create({
        user_id: id_user,
        id_user: user_id,
      });

      return res.status(200).json({
        message: 'Vocês agora são amigos',
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    // const { userId: user_id, id_user } = req.body;

    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const { idUser: id_user } = req.params;
    const user_id = decodedToken.id;

    try {
      const loggedUserFriendship = await _Friendship2.default.findOne({
        where: { user_id, id_user },
      });

      const friendFriendship = await _Friendship2.default.findOne({
        where: {
          user_id: id_user,
          id_user: user_id,
        },
      });

      await loggedUserFriendship.destroy();
      await friendFriendship.destroy();

      return res.json({
        // logged: loggedUserFriendship,
        // friend: friendFriendship
        message: 'Amizade desfeita com sucesso!',
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

exports. default = new FriendshipController();
