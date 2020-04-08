import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        passwordConfirmation: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
        birthdate: Sequelize.DATE,
        user_type: Sequelize.BOOLEAN,
        is_active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.passwordConfirmation) {
        user.password = await bcrypt.hash(user.passwordConfirmation, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ProfileImage, { foreignKey: 'id' });
    this.hasMany(models.Post);
    this.hasMany(models.Group);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
