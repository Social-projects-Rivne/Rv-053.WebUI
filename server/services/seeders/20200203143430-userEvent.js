'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_event',
      [
        {
          user_id: 1,
          event_id: 1
        },
        {
          user_id: 1,
          event_id: 3
        },
        {
          user_id: 1,
          event_id: 4
        },
        {
          user_id: 1,
          event_id: 7
        },
        {
          user_id: 1,
          event_id: 10
        },
        {
          user_id: 2,
          event_id: 1
        },
        {
          user_id: 2,
          event_id: 2
        },
        {
          user_id: 2,
          event_id: 3
        },
        {
          user_id: 2,
          event_id: 8
        },
        {
          user_id: 2,
          event_id: 9
        },
        {
          user_id: 3,
          event_id: 4
        },
        {
          user_id: 3,
          event_id: 5
        },
        {
          user_id: 3,
          event_id: 6
        },
        {
          user_id: 3,
          event_id: 10
        },
        {
          user_id: 4,
          event_id: 1
        },
        {
          user_id: 4,
          event_id: 2
        },
        {
          user_id: 4,
          event_id: 5
        },
        {
          user_id: 4,
          event_id: 4
        },
        {
          user_id: 4,
          event_id: 10
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_event', null, {});
  }
};
