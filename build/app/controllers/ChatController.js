"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

// Models
var _ChatConversation = require('../models/ChatConversation'); var _ChatConversation2 = _interopRequireDefault(_ChatConversation);
var _ChatMessage = require('../models/ChatMessage'); var _ChatMessage2 = _interopRequireDefault(_ChatMessage);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class DonationController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const conversations = await _ChatConversation2.default.findAll({
        where: { user_id },
        include: [
          {
            model: _ChatMessage2.default,
            attributes: {
              exclude: ['conversation_id', 'user_id'],
            },
            include: [
              {
                model: _User2.default,
                attributes: {
                  exclude: [
                    'email',
                    'password',
                    'birthdate',
                    'user_type',
                    'is_active',
                    'createdAt',
                    'updatedAt',
                  ],
                },
              },
            ],
          },
        ],
      });

      if (conversations.length == 0)
        return res.status(404).json({
          error: 'You have not started conversation with anyone yet.',
        });

      return res.status(200).json({ conversations: conversations });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
    const { conversation_id } = req.params;
    const { body_message } = req.body;

    try {
      let sendMessage = await _ChatMessage2.default.create({
        body_message,
        conversation_id,
        user_id,
      });

      return res.status(200).json(sendMessage);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async update(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const donation_id = parseInt(req.params.donationId);
      const { information, ammount } = req.body;

      const donation = await Donation.findByPk(donation_id);

      if (donation == null)
        return res.status(400).json({ error: 'Donation not found.' });

      if (donation.user_id != user_id)
        return res
          .status(401)
          .json({ error: 'You are not authorized to update this donation.' });

      await donation.update({
        information,
        ammount,
      });

      return res.status(200).json({ message: 'Donation updated successfully' });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const { message_id } = req.params;

      const message = await _ChatMessage2.default.findOne({
        where: { id: message_id, user_id },
      });

      if (message === null)
        return res.status(400).json({ error: 'Message not found.' });

      if (message.user_id != user_id)
        return res
          .status(401)
          .json({ error: 'You are not authorized to delete this message.' });

      await message.destroy();

      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

exports. default = new DonationController();
