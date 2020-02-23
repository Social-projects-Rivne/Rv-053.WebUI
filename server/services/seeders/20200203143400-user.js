'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John',
          last_name: 'User',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test1@mail.com',
          phone: '+380555555555',
          avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
          birthday: '1980-06-17',
          sex: 'Male',
          status_id: 1,
          role: 'User'
        },
        {
          first_name: 'Dan',
          last_name: 'Admin',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test2@mail.com',
          phone: '+380333333333',

          avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
          birthday: '1980-06-17',
          sex: 'Male',
          status_id: 1,
          role: 'Admin'
        },
        {
          first_name: 'Harry',
          last_name: 'Moderator',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test3@mail.com',
          phone: '+3807777777777',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
          birthday: '1980-06-17',
          sex: 'Male',
          status_id: 1,
          role: 'Moderator'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
