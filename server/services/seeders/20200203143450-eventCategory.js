'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'event_category',
      [
        {
          event_id: 1,
          category_id: 4
        },
        {
          event_id: 2,
          category_id: 5
        },
        {
          event_id: 3,
          category_id: 7
        },
        {
          event_id: 4,
          category_id: 8
        },
        {
          event_id: 5,
          category_id: 4
        },
        {
          event_id: 6,
          category_id: 11
        },
        {
          event_id: 7,
          category_id: 4
        },
        {
          event_id: 8,
          category_id: 1
        },
        {
          event_id: 9,
          category_id: 4
        },
        {
          event_id: 10,
          category_id: 4
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event_category', null, {});
  }
};
