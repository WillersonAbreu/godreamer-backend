import Sequelize, { Model } from 'sequelize';

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        ammount: Sequelize.STRING,
        information: Sequelize.STRING,
        target_id: Sequelize.INTEGER,
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

export default Donation;
