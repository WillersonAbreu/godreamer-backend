import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

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
        about_user: Sequelize.STRING,
      },
      {
        sequelize,
      },
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password && !user.changed()) {
        user.password = user.password
      } else {
        let isPassChanged = user.changed().includes('password')
        if (isPassChanged) {
          user.password = await bcrypt.hash(user.password, 8)
        }
      }
    })

    return this
  }

  static associate(models) {
    this.belongsTo(models.ProfileImage, { foreignKey: 'id' })
    this.hasMany(models.FollowGroup, { foreignKey: 'user_id' })
    this.hasMany(models.Post, { foreignKey: 'user_id' })
    this.hasMany(models.Group, { foreignKey: 'user_id' })
    this.hasMany(models.Friendship, { foreignKey: 'user_id' })
    this.hasOne(models.UserInfoDonation, { foreignKey: 'user_id' })
    this.hasMany(models.Donation, { foreignKey: 'user_id' })
    this.hasMany(models.ChatMessage, { foreignKey: 'user_id' })
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password)
  }
}

export default User
