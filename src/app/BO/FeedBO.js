import Post from '../models/Post';
import User from '../models/User';

class UserBO {
  async getUserPost({ str_post, user_id, url_image, url_video }) {
    try {
      const post = await Post.findOne({
        where: { str_post, user_id, url_image, url_video },
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
        order: [['created_at', 'DESC']],
      });
      return post;
    } catch (error) {
      return [];
    }
  }
}

export default new UserBO();
