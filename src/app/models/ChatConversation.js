import Sequelize, { Model } from 'sequelize';

class ChatConversation extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        id_user: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.ChatMessage, { foreignKey: 'conversation_id' });
  }
}

export default ChatConversation;
