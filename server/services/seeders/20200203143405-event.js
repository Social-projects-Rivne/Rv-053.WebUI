'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {


    return queryInterface.bulkInsert('event', [{
        name: 'ConLanguage Exchange / Comedy Showcert ',
        owner_id: 1,
        description: 'A roast is a form of humor in which a specific individual, a guest of honor, is subjected to jokes at their expense, intended to amuse the events wider audience. Such events are intended to honor a specific individual in a unique way. In addition to jokes and insult comedy. Our Special guest will be Nino Naje',
        location: 'Rivne, Soborna str',
        datetime: '1980-06-17',
        duration: '3h',
        max_participants: 30,
        min_age: 14,
        cover: 'http://linktoavatar',
        price: '100 UAH'
      },
      {
        name: 'Бізнес-ланч з Вітою Кравчук. Масштаб власника',
        owner_id: 1,
        description: 'На бізнес-ланчі з Вітою Кравчук будемо говорити на тему масштаба власника бізнесу',
        location: 'Rivne, Soborna str 11',
        datetime: '1980-06-17',
        duration: '3h',
        max_participants: 30,
        min_age: 14,
        cover: 'http://linktoavatar',
        price: '100 UAH'
      },
      {
        name: 'Безкоштовна медитація/ Free Guided Meditation',
        owner_id: 2,
        description: 'Сахаджа Йога - це унікальний і природний спосіб досягнення самореалізації, який веде до внутрішнього просвітлення.',
        location: 'Rivne, Soborna str',
        datetime: '1980-06-17',
        duration: '3h',
        max_participants: 30,
        min_age: 18,
        cover: 'http://linktoavatar',
        price: '200 UAH'
      },
      {
        name: 'Public Speaking in English in Changemakers Toastmasters Club',
        owner_id: 1,
        description: 'The most difficult is to achieve everyday goals. This is what Toastmasters about: self-development, self-improvement, and self-realization. If you follow Toastmasters educational program',
        location: 'Rivne, Vidinska',
        datetime: '1975-06-14',
        duration: '2h',
        max_participants: 30,
        min_age: 12,
        cover: 'http://linktoavatar',
        price: '50 UAH'
      },
      {
        name: 'Event 4',
        owner_id: 1,
        description: '',
        location: 'Rivne, Vidinska',
        datetime: '1975-06-14',
        duration: '2h',
        max_participants: 30,
        min_age: 12,
        cover: 'http://linktoavatar',
        price: '50 UAH'
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event', null, {});
  }
};