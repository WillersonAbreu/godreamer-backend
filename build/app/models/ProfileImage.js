"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProfileImage extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        image_source: _sequelize2.default.STRING,
        user_id: _sequelize2.default.INTEGER,
        is_active: _sequelize2.default.BOOLEAN
      },
      {
        sequelize
      }
    );
    return this;
  }
}

exports. default = ProfileImage;
