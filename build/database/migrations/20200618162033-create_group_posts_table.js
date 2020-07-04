"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    return queryInterface.createTable('group_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'groups', key: 'id' },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      str_post: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      url_image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      url_video: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.dropTable('group_posts');
  },
};
