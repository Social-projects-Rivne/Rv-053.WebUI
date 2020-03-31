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
            'Working on product and drawing the same makets are not enough to call yourself like product designer. Gather together Product Design Lectorium, to get new knowledges.',
          location: '50.6205378,26.250742',
          datetime: 1582375859000,
          duration: 60,
          max_participants: 30,
          min_age: 14,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover1.jpeg',
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
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover2.jpeg',
          price: '200 UAH'
        },
        {
          name: 'The place of no return',
          owner_id: 1,
          description:
            'Graduation performance of Group 32 of ProEnglish Drama School, directed by Valerie Zubchenko. What would you be willing to do to get what you want? A mysterious man always sits at the same table, ready to fulfill the greatest wishes of nine visitors, in exchange for tasks to be performed. This thought-provoking story about the limits of human morality raises questions about how far people will go to get what they want.',
          location: '50.6205378,26.250742',
          datetime: 1580394902394,
          duration: 1200,
          max_participants: 30,
          min_age: 18,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover3.jpeg',
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
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover4.png',
          price: '150 UAH'
        },
        {
          name: 'WordPress Kyiv February Meetup',
          owner_id: 2,
          description:
            "Запрошуємо вас на останній зимовий мітап у Києві! Якщо ви дизайнер, розробник, контент-менеджер, блогер, адміністратор або пов'язані з WordPress у будь який інший спосіб, приходьте!",
          location: '50.6205378,26.250742',
          datetime: 1587585059000,
          duration: 240,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover5.jpeg',
          price: ''
        },
        {
          name: 'Acting Boost Course',
          owner_id: 2,
          description:
            'Настав час попрацювати над вашими новорічними планами та бажаннями! Курс акторської прокачки - найкраще рішення для одного з них ;) Ідея курсу – у поєднанні тренінгів та семінарів, які не закінчується виступом. Це потужне підвищення ваших акторських навичок. Програма також розглядається як "Курс нуль" - для початківців в акторській майстерності. Її проводять різні викладачі, які передають інформацію про попередні сесії та планують свої сесії таким чином, щоб зробити їх однорідним. Так ви зможете розвити різні навички та попрацювати в різних техніках.',
          location: '50.6205378,26.250742',
          datetime: 1588985059000,
          duration: 120,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover6.png',
          price: '50 UAH'
        },
        {
          name: 'Frontend MeetUp Kyiv by Geekle',
          owner_id: 3,
          description:
            'Hey everyone! Join us on our 4th around-the-table meetup in Kyiv, which will be dedicated to the most painful topic in the Universe - f*cked up projects.',
          location: '50.6205378,26.250742',
          datetime: 1587984059000,
          duration: 180,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover7.jpeg',
          price: ''
        },
        {
          name: 'Bachata Party',
          owner_id: 3,
          description:
            "Let's dance bachata!! Dj Rubens selecting best music for you Spacious dancefloor! Great international atmosphere!",
          location: '50.6205378,26.250742',
          datetime: 1587555059000,
          duration: 60,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover8.jpeg',
          price: ''
        },
        {
          name: 'RockStar Night: Craftsmanship Night',
          owner_id: 2,
          description:
            'Speaker: Eduards Sizovs is a software architect and software development trainer who helps awesome teams around the globe excel at software architecture, engineering practices, and leadership. Eduards leads DevTernity – the top tech conference in Europe, and is the founder of a startup DevTube . He is a well-known international speaker, who had spoken at the largest conferences Worldwide. Eduards is a certified enterprise Java architect, CSM, CSPO, and ICF coach.',
          location: '50.6205378,26.250742',
          datetime: 1586585059000,
          duration: 240,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover9.jpeg',
          price: ''
        },
        {
          name: 'Flutter Europe - Impressions and Conclusions',
          owner_id: 2,
          description:
            'Meeting with Majid Hajian (Oslo, Norway) European Flutter Community activist, award-winning author of "Progressive web app with Angular" book, speaker of Flutter Europe 2020 conference and conference participants - Kateryna Novytska and Vasyl Ditsyak, members of GDG Kyiv-Center.',
          location: '50.6205378,26.250742',
          datetime: 1587575059000,
          duration: 30,
          max_participants: 30,
          min_age: 12,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover10.jpeg',
          price: '1000 UAH'
        },
        {
          name: 'Heavenly Creatures - Theatre in English Nathalie G.',
          owner_id: 1,
          description:
            'A theatre performance directed, staged and performed by 3 actors. Story based on Peter Jackson’s movie with the same name based in its turn on a real story. 2 girls fell in love with each other, mommas were against it. Alas. For the mommas…',
          location: '50.6305378,26.250742',
          datetime: 1589382959000,
          duration: 300,
          max_participants: 40,
          min_age: 20,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover11.jpeg',
          price: ''
        },
        {
          name: 'Join Soul Symphony Choir',
          owner_id: 3,
          description:
            'Soul Symphony Choir is more than entertainment; its members enjoy helping our community and reaching out to those who may appear to be less integrated into society',
          location: '47.122476,31.365967',
          datetime: 1596585089000,
          duration: 48,
          max_participants: 80,
          min_age: 16,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover12.jpeg',
          price: ''
        },
        {
          name: 'Reflexology for the feet with your child',
          owner_id: 1,
          description:
            'Are you seeking an opportunity to spend some quality time with your child and learn something together? The Reflexology for Feet with Your Child, one day workshop, is a great way to achieve that. It provides practical instruction in reflexology massage.',
          location: '50.443513,30.585938',
          datetime: 1598585089000,
          duration: 100,
          max_participants: 50,
          min_age: 3,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover13.jpg',
          price: '200 UAH'
        },
        {
          name: 'Lewisham School of Language, Health and Wellbeing',
          owner_id: 1,
          description:
            'Lewisham School of Language, Health and Wellbeing aims to enhance and engage through new, exciting learning opportunities. We offer a diverse range of subjects across all levels of ability. WE aim to provide you with a fresh approach to living well - promoting a positive life-balance and improving your quality of life through enrichment and enjoyment.',
          location: '50.527397,30.388184',
          datetime: 1595487889000,
          duration: 1000,
          max_participants: 1000,
          min_age: 18,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover14.jpg',
          price: '500 UAH'
        },
        {
          name: 'Parent and toddler yoga',
          owner_id: 1,
          description:
            'Fascinate and engage your toddler using colourful resources, bubbles and textures during this 4-week parent and toddler yoga class. In this friendly class you will warm-up using exercises and songs. You will develop asana into inversions such as shoulder stand and bridge pose and follow a sun salutation to increase muscle tone and concentration skills. Through stretches and guided relaxation you will continue to release physical and mental tension. Adults attending with baby can be a parent, grandparent or carer.',
          location: '48.965794,24.191895',
          datetime: 1587687889000,
          duration: 300,
          max_participants: 30,
          min_age: 0,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover15.jpg',
          price: '300 UAH'
        },
        {
          name: 'Ukrainian Tropical House/ Deep House Meetup',
          owner_id: 3,
          description:
            'Are these some of your favourite DJs? Kygo, Robin Schulz, Lost Frequencies, Klingande, Matoma, Sam Feldt, Kungs, Alex Adair, Sigala.. etc.',
          location: '49.724479,23.730469',
          datetime: 1586287889000,
          duration: 400,
          max_participants: 500,
          min_age: 18,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover16.jpg',
          price: '400 UAH'
        },
        {
          name: 'Ukrainian Arts & Culture Group',
          owner_id: 2,
          description:
            'This is a group for anyone with an interest in Art Galleries, Museums & Culture. You will find the groups activities entertaining if you enjoy visiting Museums, like Literature, or study any other art related subjects. We meet to visit, and learn more about the Art & Culture on offer in London.',
          location: '50.736455,25.224609',
          datetime: 1586746889000,
          duration: 300,
          max_participants: 50,
          min_age: 16,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover17.jpg',
          price: ''
        },
        {
          name: 'Classy Speed Friending Sunday Afternoon Social',
          owner_id: 3,
          description: 'We are an informal, sociable group for people.',
          location: '50.205033,28.366699',
          datetime: 1595746889000,
          duration: 100,
          max_participants: 30,
          min_age: 22,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover18.jpeg',
          price: '50 UAH'
        },
        {
          name: 'The Dressmakers Club',
          owner_id: 3,
          description:
            'We are an informal, sociable group for people who love to sew and making our own clothes. All skill levels, age, gender welcome! Learn new skills, make friends and wear clothes that fit and do not cost a fortune! Sewing can be such a solitary pursuit so its great to meet other sewing enthusiasts who know what you are talking about and share your passion.',
          location: '50.205033,28.366699',
          datetime: 1595746889000,
          duration: 3000,
          max_participants: 100,
          min_age: 16,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover19.jpg',
          price: ''
        },
        {
          name: 'Philosophical Fiction Book Club',
          owner_id: 1,
          description:
            'We meet once every two months to discuss fiction that explores the nature of existence, challenges social and political concepts and tries to get to the core of what it might mean to be human.',
          location: '50.205033,28.366699',
          datetime: 1595746889000,
          duration: 200,
          max_participants: 20,
          min_age: 30,
          cover:
            'http://eeeeevent-rv053-webui-back.herokuapp.com/uploads/covers/cover20.jpeg',
          price: ''
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event', null, {});
  }
};
