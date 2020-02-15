const express = require('express');

const route = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authorization');

route.get('/current', auth, userController.getCurrent);
route.put('/current', auth, userController.updateProfile);
route.get('/by-id/:id', auth, userController.getById);
route.get('/events', auth, userController.getEvents);
route.get('/followed-events', auth, userController.getFollowedEvents);
route.get('/categories', auth, userController.getCategories);
route.get('/followed-categories', auth, userController.getFollowedCategories);
route.put('/role-moderator/:id', auth, userController.setRoleToModerator);
route.put('/role-user/:id', auth, userController.setRoleToUser);

module.exports = route;
