'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'category',
      [
        {
          category: 'Music',
          parent_id: 0
        },
        {
          category: 'Sports & Fitness',
          parent_id: 0
        },
        {
          category: 'Outdoors & Adventure',
          parent_id: 0
        },
        {
          category: 'Technology',
          parent_id: 0
        },
        {
          category: 'Films',
          parent_id: 0
        },
        {
          category: 'Health & Wellness',
          parent_id: 0
        },
        {
          category: 'Education',
          parent_id: 0
        },
        {
          category: 'Travel',
          parent_id: 0
        },
        {
          category: 'Fashion & Beauty',
          parent_id: 0
        },
        {
          category: 'Nature',
          parent_id: 0
        },
        {
          category: 'Arts',
          parent_id: 0
        },
        {
          category: 'Hobbies & Crafts',
          parent_id: 0
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
