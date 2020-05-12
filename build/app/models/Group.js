"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Group extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        group_name: _sequelize2.default.STRING,
        group_desc: _sequelize2.default.STRING,
        group_image: _sequelize2.default.STRING,
        user_id: _sequelize2.default.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.hasMany(models.FollowGroup, { foreignKey: 'group_id' } );
  }
}

exports. default = Group;
