import Sequelize, { Model } from 'sequelize';

class ProfileImage extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        image_source: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        is_active: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default ProfileImage;
