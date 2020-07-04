"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class FeedHelper {
  async getAllPosts() {
    const posts = await _sequelize2.default.query(
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
        type: _sequelize.QueryTypes.SELECT,
      }
    );

    console.log(posts);
  }
}

exports. default = new FeedHelper();
