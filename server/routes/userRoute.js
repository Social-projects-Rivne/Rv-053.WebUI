const express = require('express');

const route = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authorization');

route.get('/current', auth, userController.getCurrent);
route.post('/current', auth, userController.updateProfile);
route.get('/by-id/:id', auth, userController.getById);
route.post('/ban/:id', auth, userController.ban);
route.delete('/unban/:id', auth, userController.unban);
route.get('/events', auth, userController.getEvents);
route.get('/followed-events', auth, userController.getFollowedEvents);
route.get('/categories', auth, userController.getCategories);
route.get('/followed-categories', auth, userController.getFollowedCategories);

module.exports = route;
