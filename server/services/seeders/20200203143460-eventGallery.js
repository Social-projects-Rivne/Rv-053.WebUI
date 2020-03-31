'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'event_gallery',
      [
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-4-gallery-item-1.jpg',
          event_id: 4,
          description: 'Throw it up',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-6-gallery-item-1.jpg',
          event_id: 6,
          description: 'Rock is cool',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-6-gallery-item-2.jpg',
          event_id: 6,
          description: 'Something strange',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-6-gallery-item-3.jpg',
          event_id: 6,
          description: 'Fireworks',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-9-gallery-item-1.jpg',
          event_id: 9,
          description: '',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-9-gallery-item-2.jpg',
          event_id: 9,
          description: 'Everyone can speak',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-9-gallery-item-3.jpg',
          event_id: 9,
          description: 'Conference',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-9-gallery-item-4.jpg',
          event_id: 9,
          description: 'It is magic',
          is_deleted: false
        },
        {
          img_url:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/gallery/event-9-gallery-item-5.jpg',
          event_id: 9,
          description: 'Join to us',
          is_deleted: false
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event_gallery', null, {});
  }
};
