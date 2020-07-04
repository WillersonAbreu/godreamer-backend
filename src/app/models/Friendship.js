import Sequelize, { Model } from 'sequelize';

class Friendship extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        id_user: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    // this.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //   foreignKeyConstraint: true,
    // });
    this.belongsTo(models.User, {
      foreignKey: 'id_user',
      foreignKeyConstraint: true,
    });
  }
}

export default Friendship;
