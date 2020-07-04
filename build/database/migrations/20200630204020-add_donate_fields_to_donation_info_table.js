"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:      
    */
    return Promise.all([
      queryInterface.addColumn('user_info_donations', 'cpf', {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('user_info_donations', 'bank_name', {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('user_info_donations', 'agency_number', {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:      
    */
    return Promise.all([
      queryInterface.removeColumn('user_info_donations', 'cpf'),
      queryInterface.removeColumn('user_info_donations', 'bank_name'),
      queryInterface.removeColumn('user_info_donations', 'agency_number'),
    ]);
  },
};
