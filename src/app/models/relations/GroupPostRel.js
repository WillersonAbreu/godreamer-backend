// import Sequelize, { Model } from 'sequelize';

// class GroupPostRel extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         group_id: Sequelize.STRING,
//         post_id: Sequelize.STRING
//       },
//       {
//         sequelize
//       }
//     );
//     return this;
//   }

//   static associate(models) {
//     this.belongsTo(models.Group, { foreignKey: 'id' });
//     this.belongsTo(models.Post, { foreignKey: 'id' });
//   }
// }

// export default GroupPostRel;
