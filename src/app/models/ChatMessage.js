import Sequelize, { Model } from 'sequelize';

class ChatMessage extends Model {
  static init(sequelize) {
    super.init(
      {
        body_message: Sequelize.STRING,
        conversation_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ChatConversation, { foreignKey: 'id' });
    // this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default ChatMessage;
