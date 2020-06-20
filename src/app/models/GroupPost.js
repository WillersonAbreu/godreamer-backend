import Sequelize, { Model } from 'sequelize';

class GroupPost extends Model {
  static init(sequelize) {
    super.init(
      {
        group_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        str_post: Sequelize.STRING,
        url_image: Sequelize.STRING,
        url_video: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKeyConstraint: true });
    this.belongsTo(models.User, { foreignKeyConstraint: true });
  }
}

export default GroupPost;
