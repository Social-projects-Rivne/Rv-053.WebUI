'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('user_status', [{
        id: 1,
        status: 'Active'
      },
      {
        id: 2,
        status: 'Ban'
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('user_status', null, {});

  }
};