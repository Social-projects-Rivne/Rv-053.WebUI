const express = require('express');

const route = express.Router();
const { profileValidation, validate } = require('../middlewares/validator');
const userController = require('../controllers/userController');
const auth = require('../middlewares/authorization');
const authAndModeratorAdmin = require('../middlewares/adminAndModeratorAuthorization');

route.get('/current', auth, userController.getCurrent);
route.put('/current', auth, validate, userController.updateProfile);
route.get('/events', auth, userController.getEvents);
route.get('/followed-events', auth, userController.getFollowedEvents);
route.get('/past-events', auth, userController.getPastEvents);
route.delete('/unfollow-event/:id', auth, userController.unfollowFromEvent);
route.post('/follow-event/:id', auth, userController.followEvent);
route.get('/categories', auth, userController.getCategories);
route.get('/followed-categories', auth, userController.getFollowedCategories);
route.put('/role-admin/:id', authAndModeratorAdmin, userController.setRoleToAdmin);
route.put('/role-moderator/:id', authAndModeratorAdmin, userController.setRoleToModerator);
route.put('/role-user/:id', authAndModeratorAdmin, userController.setRoleToUser);
route.post('/ban/:id', authAndModeratorAdmin, userController.ban);
route.delete('/unban/:id', authAndModeratorAdmin, userController.unban);
route.post('/follow-category/:id', auth, userController.followCategory);
route.delete('/unfollow-category/:id', auth, userController.unfollowCategory);
route.get('/:id', auth, userController.getById);

module.exports = route;
