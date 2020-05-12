"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        passwordConfirmation: _sequelize2.default.VIRTUAL,
        password: _sequelize2.default.STRING,
        birthdate: _sequelize2.default.DATE,
        user_type: _sequelize2.default.BOOLEAN,
        is_active: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.passwordConfirmation) {
        user.password = await _bcryptjs2.default.hash(user.passwordConfirmation, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ProfileImage, { foreignKey: 'id' });
    this.hasMany(models.FollowGroup, { foreignKey: 'user_id' });
    this.hasMany(models.Post, { foreignKey: 'user_id' });
    this.hasMany(models.Group, { foreignKey: 'user_id' });
    this.hasMany(models.Friendship, { foreignKey: 'user_id' });
    this.hasOne(models.UserInfoDonation, { foreignKey: 'user_id' });
    this.hasMany(models.Donation, { foreignKey: 'user_id' });
    this.hasMany(models.ChatMessage, { foreignKey: 'user_id' });
  }

  async checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password);
  }
}

exports. default = User;
