"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Donation extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        ammount: _sequelize2.default.STRING,
        information: _sequelize2.default.STRING,
        target_id: _sequelize2.default.INTEGER,
        user_id: _sequelize2.default.INTEGER
        
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

exports. default = Donation;
