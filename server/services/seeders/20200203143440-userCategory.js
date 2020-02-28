'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_category',
      [
        {
          category_id: 1,
          user_id: 1
        },
        {
          category_id: 1,
          user_id: 2
        },
        {
          category_id: 2,
          user_id: 1
        },
        {
          category_id: 2,
          user_id: 3
        },
        {
          category_id: 2,
          user_id: 4
        },
        {
          category_id: 3,
          user_id: 4
        },
        {
          category_id: 4,
          user_id: 1
        },
        {
          category_id: 4,
          user_id: 3
        },
        {
          category_id: 5,
          user_id: 4
        },
        {
          category_id: 6,
          user_id: 1
        },
        {
          category_id: 7,
          user_id: 2
        },
        {
          category_id: 7,
          user_id: 3
        },
        {
          category_id: 8,
          user_id: 1
        },
        {
          category_id: 9,
          user_id: 1
        },
        {
          category_id: 10,
          user_id: 1
        },
        {
          category_id: 11,
          user_id: 1
        },
        {
          category_id: 12,
          user_id: 1
        },
        {
          category_id: 9,
          user_id: 3
        },
        {
          category_id: 11,
          user_id: 2
        },
        {
          category_id: 12,
          user_id: 2
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_category', null, {});
  }
};
