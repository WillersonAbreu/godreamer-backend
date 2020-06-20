import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import FollowGroup from '../models/FollowGroup';
import User from '../models/User';
import Group from '../models/Group';

class FollowGroupController {
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
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                'id',
                'password',
                'birthdate',
                'user_type',
                'is_active',
                'createdAt',
                'updatedAt',
              ],
            },
          },
          {
            model: Group,
            attributes: {
              exclude: ['user_id', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });
      return res.status(200).json({ followedGroups });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const { group_id } = req.body;
    const user_id = decodedToken.id;

    try {
      const followedGroup = await FollowGroup.findOne({
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

export default new FollowGroupController();
