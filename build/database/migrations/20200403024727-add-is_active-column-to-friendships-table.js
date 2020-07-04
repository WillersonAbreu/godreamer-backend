"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('friendships', 'is_active', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('friendships', 'is_active');
  }
};
