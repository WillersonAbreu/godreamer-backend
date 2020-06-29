'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Willerson',
          email: 'w@w.com',
          password:
            '$2a$08$smJrLAmF6pRKfctma4fBieKqkAUkPt/nWR4GZpXHUfVX5OSZx4TtK',
          birthdate: '1992-07-29',
          user_type: 2,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rayssa',
          email: 'r@r.com',
          password:
            '$2a$08$smJrLAmF6pRKfctma4fBieKqkAUkPt/nWR4GZpXHUfVX5OSZx4TtK',
          birthdate: '1997-02-18',
          user_type: 2,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Leonel',
          email: 'l@l.com',
          password:
            '$2a$08$smJrLAmF6pRKfctma4fBieKqkAUkPt/nWR4GZpXHUfVX5OSZx4TtK',
          birthdate: '1962-08-02',
          user_type: 1,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rodrigo',
          email: 'rodrigo@rodrigo.com',
          password:
            '$2a$08$smJrLAmF6pRKfctma4fBieKqkAUkPt/nWR4GZpXHUfVX5OSZx4TtK',
          birthdate: '1987-07-17',
          user_type: 1,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete('users', null, {});
  },
};
