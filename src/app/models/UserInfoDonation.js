import Sequelize, { Model } from 'sequelize';

class UserInfoDonation extends Model {
  static init(sequelize) {
    super.init(
      {
        information: Sequelize.STRING,
        account: Sequelize.STRING,
        user_id: Sequelize.INTEGER
        
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

export default UserInfoDonation;
