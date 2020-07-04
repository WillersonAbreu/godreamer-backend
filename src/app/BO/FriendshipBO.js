import Friendship from '../models/Friendship';
import User from '../models/User';

class FriendshipBO {
  async getFriends(user_id) {
    try {
      const friends = await Friendship.findAll({
        where: { user_id },
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        include: [
          {
            model: User,
          },
        ],
        order: [['created_at', 'DESC']],
      });
      return friends;
    } catch (error) {
      return [];
    }
  }
}

export default new FriendshipBO();
