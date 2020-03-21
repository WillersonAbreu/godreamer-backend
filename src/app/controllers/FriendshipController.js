import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import Friendship from '../models/Friendship';

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
    const id_user = req.body;
    const user_id = decodedToken.id;
    const data = {
      user_id,
      id_user
    };
    try {
      await Friendship.create(data);
      return res
        .status(200)
        .json({ message: 'Friendship registered successfully' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new FriendshipController();
