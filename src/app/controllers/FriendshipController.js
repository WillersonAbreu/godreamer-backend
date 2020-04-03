import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import Friendship from '../models/Friendship';
import { Op } from 'sequelize';

class FriendshipController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const friends = await Friendship.findAll({
        where: { user_id },
        attributes: {
          exclude: ['UserId', 'updatedAt']
        },
        order: [['created_at', 'DESC']]
      });
      return res.status(200).json({ friends });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async store(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const { id_user } = req.body;
    const user_id = decodedToken.id;
    const loggedUserData = {
      user_id,
      id_user,
      is_active: true
    };
    const friendUserData = {
      user_id: id_user,
      id_user: user_id
    };
    try {
      await Friendship.create(loggedUserData);
      await Friendship.create(friendUserData);
      return res
        .status(200)
        .json({ message: 'Friendship registered successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { userId: user_id, id_user } = req.body;

    try {
      const loggedUserFriendship = await Friendship.findOne({
        where: { user_id, id_user }
      });

      const friendFriendship = await Friendship.findOne({
        where: {
          user_id: id_user,
          id_user: user_id
        }
      });

      await loggedUserFriendship.destroy();
      await friendFriendship.destroy();

      return res.json({
        // logged: loggedUserFriendship,
        // friend: friendFriendship
        message: 'Amizade desfeita com sucesso!'
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new FriendshipController();
