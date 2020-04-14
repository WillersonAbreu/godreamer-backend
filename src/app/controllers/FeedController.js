import Post from '../models/Post';
import User from '../models/User';
import { Op } from 'sequelize';
import FriendshipBO from '../BO/FriendshipBO';
import Group from '../models/Group';
import GroupFollow from '../models/GroupFollow';

// Controllers

class FeedController {
  async getPosts(req, res) {
    const { userId } = req.params;

    try {
      const friends = await FriendshipBO.getFriends(userId);
      let users = [];

      users.push({ user_id: userId });

      await friends.map((friend) => {
        users.push({ user_id: friend.id_user });
      });

      const condition = {
        [Op.or]: users,
      };

      const posts = await Post.findAll({
        where: condition,
        include: {
          model: User,
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
      });
      return res.status(200).json({ posts });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async getGroups(req, res) {
    const { userId: user_id } = req.params;

    try {
      const followedGroups = await GroupFollow.findAll({
        where: {
          user_id,
        },
      });
      return res.status(200).json({ followedGroups });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new FeedController();
