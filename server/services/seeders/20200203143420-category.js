'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'category',
      [
        {
          category: 'Music',
          category_icon:'icon-headphones',
          parent_id: 0
        },
        {
          category: 'Sports & Fitness',
          category_icon:'icon-futbol-o',
          parent_id: 0
        },
        {
          category: 'Outdoors & Adventure',
          category_icon:'icon-bicycle',
          parent_id: 0
        },
        {
          category: 'Technology',
          category_icon:'icon-cogs',
          parent_id: 0
        },
        {
          category: 'Films',
          category_icon:'icon-film',
          parent_id: 0
        },
        {
          category: 'Health & Wellness',
          category_icon:'icon-stethoscope',
          parent_id: 0
        },
        {
          category: 'Education',
          category_icon:'icon-graduation-cap',
          parent_id: 0
        },
        {
          category: 'Travel',
          category_icon:'icon-globe',
          parent_id: 0
        },
        {
          category: 'Fashion & Beauty',
          category_icon:'icon-shopping-bag',
          parent_id: 0
        },
        {
          category: 'Nature',
          category_icon:'icon-envira',
          parent_id: 0
        },
        {
          category: 'Arts',
          category_icon:'icon-paint-brush',
          parent_id: 0
        },
        {
          category: 'Hobbies & Crafts',
          category_icon:'icon-cut',
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
