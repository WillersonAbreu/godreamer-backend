"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class GroupPost extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        group_id: _sequelize2.default.INTEGER,
        user_id: _sequelize2.default.INTEGER,
        str_post: _sequelize2.default.STRING,
        url_image: _sequelize2.default.STRING,
        url_video: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKeyConstraint: true });
    this.belongsTo(models.User, { foreignKeyConstraint: true });
  }
}

exports. default = GroupPost;
