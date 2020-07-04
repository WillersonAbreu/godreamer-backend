"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.addColumn('users', 'about_user', {
      allowNull: true,
      type: Sequelize.TEXT,
      defaultValue: null,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:      
    */
    return queryInterface.removeColumn('users', 'about_user');
  },
};
