import Friendship from '../models/Friendship';

class FriendshipBO {
  async getFriends(user_id) {
    try {
      const friends = await Friendship.findAll({
        where: { user_id },
        attributes: {
          exclude: ['UserId', 'updatedAt'],
        },
        order: [['created_at', 'DESC']],
      });
      return friends;
    } catch (error) {
      return [];
    }
  }
}

export default new FriendshipBO();
