import Sequelize, { Model } from 'sequelize';

class FollowGroup extends Model {
  static init(sequelize) {
    super.init(
      {
        group_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    this.belongsTo(models.Group, {
      foreignKey: 'group_id',
    });
  }
}

export default FollowGroup;
