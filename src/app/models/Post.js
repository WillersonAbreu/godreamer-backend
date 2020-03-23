import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        str_post: Sequelize.STRING,
        url_image: Sequelize.STRING,
        url_video: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKeyConstraint: true });
  }
}

export default Post;
