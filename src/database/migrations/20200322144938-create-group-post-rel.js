// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('group_post_rel', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       group_id: {
//         allowNull: true,
//         type: Sequelize.INTEGER,
//         references: { model: 'groups', key: 'id' },
//         onUpdate: 'CASCADE',
//         onDelete: 'SET NULL',
//         unique: true
//       },
//       post_id: {
//         allowNull: true,
//         type: Sequelize.INTEGER,
//         references: { model: 'posts', key: 'id' },
//         onUpdate: 'CASCADE',
//         onDelete: 'SET NULL',
//         unique: true
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         allowNull: false
//       },
//       updated_at: {
//         type: Sequelize.DATE,
//         allowNull: false
//       }
//     }
//     )},

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('group_post_rel');
//   }
  
// };
