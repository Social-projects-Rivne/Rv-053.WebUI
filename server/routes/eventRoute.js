const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

const { createEventValidation, validate } = require('../middlewares/validator');
const { CheckUrlInCache } = require('../middlewares/redisMiddleware');
const adminAuth = require('../middlewares/adminAuthorization');

const uploadCover = require('../middlewares/upload-images');

// Search event by name or description/get all event
router.get('/', CheckUrlInCache, eventController.searchEvent);
// Create new event
router.post('/', uploadCover.single('avatar'), eventController.createEvent);
// Get info about current event by id
router.get('/:id', CheckUrlInCache, eventController.getEventByID);
router.put('/:id/ban', adminAuth, eventController.banEvent);
router.put('/:id/unban', adminAuth, eventController.unbanEvent);

module.exports = router;
