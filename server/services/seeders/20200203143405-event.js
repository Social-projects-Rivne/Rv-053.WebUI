'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'event',
      [
        {
          name: 'Product Design Lectorium',
          owner_id: 1,
          description:
            'Працювати над продуктом і малювати одні й ті ж макети недостатньо, щоб називати себе продуктовим дизайнером. Збираємо Product Design Lectorium, щоб отримати нові знання, практики і підходи та перейти від процесу малювання до процесу мислення.Після лекторіуму традиційно йдемо знайомитися і спілкуватися у найближчому барі.',
          location: '50.6205378,26.250742',
          datetime: 1582375859000,
          duration: 60,
          max_participants: 30,
          min_age: 14,
          cover: 'http://localhost:5001/uploads/covers/cover1.jpeg',
          price: '100 UAH'
        },
        {
          name: 'Ashes to ashes | Premiere',
          owner_id: 1,
          description:
            'Ashes to Ashes is a performance based on the Harold Pinter play written in 1996. It is a conversation between a man and a woman (Devlin and Rebecca), where they are looking for the truth. However, both have their own truth, their own past and worldviews that do not allow them to find the way to each other. Even though they are sitting in a cozy living room and their life seems to be perfect, they cannot find comfort in each other. Violence runs through their present lives being the reflection of the past traumas of the whole generation and nothing will change until they let it go.',
          location: '50.6205378,26.250742',
          datetime: 1582573859000,
          duration: 120,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover2.jpeg',
          price: '200 UAH'
        },
        {
          name: 'The place of no return',
          owner_id: 1,
          description:
            'Graduation performance of Group 32 of ProEnglish Drama School, directed by Valerie Zubchenko. What would you be willing to do to get what you want? A mysterious man always sits at the same table, ready to fulfill the greatest wishes of nine visitors, in exchange for tasks to be performed. This thought-provoking story about the limits of human morality raises questions about how far people will go to get what they want.',
          location: '50.6205378,26.250742',
          datetime: 1587545059000,
          duration: 1200,
          max_participants: 30,
          min_age: 18,
          cover: 'http://localhost:5001/uploads/covers/cover3.jpeg',
          price: '200 UAH'
        },
        {
          name: 'International Meeting + Comedy roast',
          owner_id: 1,
          description:
            'Join our international community in Kyiv! The perfect place to connect local and foreigners in a friendly international environment!(speak English, French, Spanish, ukranian, German and more languages with natives, make new international friends, have a great time, drinks and fun, Enjoy English comedy night)',
          location: '50.6205378,26.250742',
          datetime: 1587584059000,
          duration: 150,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover4.png',
          price: '150 UAH'
        },
        {
          name: 'WordPress Kyiv February Meetup',
          owner_id: 1,
          description:
            "Запрошуємо вас на останній зимовий мітап у Києві! Якщо ви дизайнер, розробник, контент-менеджер, блогер, адміністратор або пов'язані з WordPress у будь який інший спосіб, приходьте!",
          location: '50.6205378,26.250742',
          datetime: 1587585059000,
          duration: 240,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover5.jpeg',
          price: ''
        },
        {
          name: 'Acting Boost Course',
          owner_id: 1,
          description:
            'Настав час попрацювати над вашими новорічними планами та бажаннями! Курс акторської прокачки - найкраще рішення для одного з них ;) Ідея курсу – у поєднанні тренінгів та семінарів, які не закінчується виступом. Це потужне підвищення ваших акторських навичок. Програма також розглядається як "Курс нуль" - для початківців в акторській майстерності. Її проводять різні викладачі, які передають інформацію про попередні сесії та планують свої сесії таким чином, щоб зробити їх однорідним. Так ви зможете розвити різні навички та попрацювати в різних техніках.',
          location: '50.6205378,26.250742',
          datetime: 1587585059000,
          duration: 120,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover6.png',
          price: '50'
        },
        {
          name: 'Frontend MeetUp Kyiv by Geekle',
          owner_id: 1,
          description:
            'Hey everyone! Join us on our 4th around-the-table meetup in Kyiv, which will be dedicated to the most painful topic in the Universe - f*cked up projects.',
          location: '50.6205378,26.250742',
          datetime: 1587584059000,
          duration: 180,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover7.jpeg',
          price: ''
        },
        {
          name: 'Bachata Party',
          owner_id: 1,
          description:
            "Let's dance bachata!! Dj Rubens selecting best music for you Spacious dancefloor! Great international atmosphere!",
          location: '50.6205378,26.250742',
          datetime: 1587555059000,
          duration: 60,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover8.jpeg',
          price: ''
        },
        {
          name: 'RockStar Night: Craftsmanship Night',
          owner_id: 1,
          description:
            'Speaker: Eduards Sizovs is a software architect and software development trainer who helps awesome teams around the globe excel at software architecture, engineering practices, and leadership. Eduards leads DevTernity – the top tech conference in Europe, and is the founder of a startup DevTube . He is a well-known international speaker, who had spoken at the largest conferences Worldwide. Eduards is a certified enterprise Java architect, CSM, CSPO, and ICF coach.',
          location: '50.6205378,26.250742',
          datetime: 1587585059000,
          duration: 240,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover9.jpeg',
          price: ''
        },
        {
          name: 'Flutter Europe - Impressions and Conclusions',
          owner_id: 1,
          description:
            'Meeting with Majid Hajian (Oslo, Norway) European Flutter Community activist, award-winning author of "Progressive web app with Angular" book, speaker of Flutter Europe 2020 conference and conference participants - Kateryna Novytska and Vasyl Ditsyak, members of GDG Kyiv-Center.',
          location: '50.6205378,26.250742',
          datetime: 1587575059000,
          duration: 30,
          max_participants: 30,
          min_age: 12,
          cover: 'http://localhost:5001/uploads/covers/cover10.jpeg',
          price: '1000 UAH'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event', null, {});
  }
};
