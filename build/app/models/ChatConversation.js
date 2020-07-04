"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ChatConversation extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: _sequelize2.default.INTEGER,
        id_user: _sequelize2.default.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.ChatMessage, { foreignKey: 'conversation_id' });
    this.belongsTo(models.User, { foreignKey: 'id_user' });
  }
}

exports. default = ChatConversation;
