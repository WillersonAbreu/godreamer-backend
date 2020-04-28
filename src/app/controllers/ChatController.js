import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import ChatConversation from '../models/ChatConversation';
import ChatMessage from '../models/ChatMessage';
import User from '../models/User';

class DonationController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const conversations = await ChatConversation.findAll({
        where: { user_id },
        include: [
          {
            model: ChatMessage,
            attributes: {
              exclude: ['conversation_id', 'user_id'],
            },
            include: [
              {
                model: User,
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
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;
    const { conversation_id } = req.params;
    const { body_message } = req.body;

    try {
      let sendMessage = await ChatMessage.create({
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
    const decodedToken = await promisify(jwt.verify)(
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
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const { message_id } = req.params;

      const message = await ChatMessage.findOne({
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

export default new DonationController();
