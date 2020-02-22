const express = require('express');

const route = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authorization');
const authAdmin = require('../middlewares/adminAuthorization');
route.get('/current', auth, userController.getCurrent);
route.put('/current', auth, userController.updateProfile);
route.get('/events', auth, userController.getEvents);
route.get('/followed-events', auth, userController.getFollowedEvents);
route.delete('/unfollow-event/:id', auth, userController.unfollowFromEvent);
route.get('/categories', auth, userController.getCategories);
route.get('/followed-categories', auth, userController.getFollowedCategories);
route.put('/role-moderator/:id', authAdmin, userController.setRoleToModerator);
route.put('/role-user/:id', authAdmin, userController.setRoleToUser);
route.post('/ban/:id', authAdmin, userController.ban);
route.delete('/unban/:id', authAdmin, userController.unban);
route.get('/:id', auth, userController.getById);

module.exports = route;
