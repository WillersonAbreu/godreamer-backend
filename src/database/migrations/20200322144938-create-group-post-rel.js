'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('group_post_rel', {
      group_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true
      },
      post_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'posts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true
      },
    }
    )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('group_post_rel');
  }
  
};
