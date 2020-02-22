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
          phone: '+380993214455',
          avatar: 'http://localhost:5001/uploads/avatars/ava1.png',
          birthday: 814275698,
          sex: 'Male',
          status_id: 1,
          role: 'User'
        },
        {
          first_name: 'Dan',
          last_name: 'Admin',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test2@mail.com',
          phone: '+380973123212',
          avatar: 'http://localhost:5001/uploads/avatars/ava2.png',
          birthday: 330090098,
          sex: 'Female',
          status_id: 1,
          role: 'Admin'
        },
        {
          first_name: 'Harry',
          last_name: 'Moderator',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test3@mail.com',
          phone: '+380501234567',
          avatar: 'http://localhost:5001/uploads/avatars/ava3.png',
          birthday: 171891698,
          sex: 'Male',
          status_id: 1,
          role: 'Moderator'
        },
        {
          first_name: 'Vasya',
          last_name: 'Banned',
          password: '$2a$10$pXXIU04nVj9x7q37VZm9cuY5DmWoZoke7SyCnw5wVrtFGjVWWJ9zm',
          email: 'test4@mail.com',
          phone: '+3807777777777',
          avatar: 'http://localhost:5001/uploads/avatars/ava3.png',
          birthday: 171891698,
          sex: 'Male',
          status_id: 2,
          role: 'User'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
