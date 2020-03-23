import Sequelize, { Model } from 'sequelize';

class Group extends Model {
    static init(sequelize) {
        super.init(
          {
            id: Sequelize.INTEGER,  
            group_name: Sequelize.STRING,
            group_image: Sequelize.STRING
          },
          {
            sequelize
          }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'id' });
      }
}

export default Group;