import sequelize, { QueryTypes } from 'sequelize';

class FeedHelper {
  async getAllPosts() {
    const posts = await sequelize.query(
      `SELECT 
	      p.id, 
        p.user_id, 
        p.url_image, 
        p.url_video, 
        p.created_at,
        u.id,
        u.name
      FROM posts AS p
      INNER JOIN users AS u
      ON u.id = p.user_id
      WHERE u.id = 1
      OR u.id = 2
      OR u.id = 3`,
      {
        type: QueryTypes.SELECT,
      }
    );

    console.log(posts);
  }
}

export default new FeedHelper();
