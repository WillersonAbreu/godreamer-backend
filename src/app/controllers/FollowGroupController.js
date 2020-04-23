import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import FollowGroup from '../models/FollowGroup';

class FriendshipController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const user_id = decodedToken.id;

    try {
      const followedGroups = await FollowGroup.findAll({
        where: {
          user_id,
        },
      });
      return res.status(200).json({ followedGroups });
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
    const { group_id } = req.body;
    const user_id = decodedToken.id;

    try {
      await FollowGroup.create({ group_id, user_id });
      return res
        .status(200)
        .json({ message: 'You are following this group now' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new FriendshipController();
