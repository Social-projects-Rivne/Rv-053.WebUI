'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        first_name: 'John',
        last_name: 'User',
        password: 'wO9IMYsYCcEXHktrWWPi3u8NJbOzoe59vEFFDxJec56cdXsvmu9dK',
        email: 'test1@mail.com',
        phone: '+380555555555',
        avatar: 'http://linkstoava3',
        birthday: '1980-06-17',
        sex: 'Male',
        status_id: 1,
        role: 'User',
      },
      {
        first_name: 'Dan',
        last_name: 'Admin',
        password: 'wO9IMYsYCcEXHktrWWPi3u8NJbOzoe59vEFFDxJec56cdXsvmu9dK',
        email: 'test2@mail.com',
        phone: '+380333333333',
        avatar: 'http://linkstoava2',
        birthday: '1980-06-17',
        sex: 'Male',
        status_id: 1,
        role: 'Admin',
      },
      {
        first_name: 'Harry',
        last_name: 'Moderator',
        password: 'wO9IMYsYCcEXHktrWWPi3u8NJbOzoe59vEFFDxJec56cdXsvmu9dK',
        email: 'test3@mail.com',
        phone: '+3807777777777',
        avatar: 'http://linkstoava1',
        birthday: '1980-06-17',
        sex: 'Male',
        status_id: 1,
        role: 'Moderator',
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('users', null, {});

  }
};