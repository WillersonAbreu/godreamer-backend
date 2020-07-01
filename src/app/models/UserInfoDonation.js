import Sequelize, { Model } from 'sequelize';

class UserInfoDonation extends Model {
  static init(sequelize) {
    super.init(
      {
        information: Sequelize.STRING,
        account: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        cpf: Sequelize.STRING,
        bank_name: Sequelize.STRING,
        agency_number: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default UserInfoDonation;
