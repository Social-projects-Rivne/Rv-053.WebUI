'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'event_feedback', 
        [
          {
            user_event_id: 1,
            feedback: 'It was so so cool',
            date: 1584715011000
          },
          {
            user_event_id: 6,
            feedback: 'Good event!',
            date: 1584916013000
          },
          {
            user_event_id: 7,
            feedback: 'It was too long and boring...',
            date: 1584516013000
          },
          {
            user_event_id: 6,
            feedback: 'I am waiting for the next time. It was so funny. Thanks!',
            date: 1584916013000
          },
          {
            user_event_id: 7,
            feedback: 'Good, but not enough..',
            date: 1584516013000
          }
        ], {});
    
  },
 
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('event_feedback', null, {});
  }
};
