'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ammount: {
        allowNull: false,
        type: Sequelize.STRING
      },
      information: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      target_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('donations');
  }
};
