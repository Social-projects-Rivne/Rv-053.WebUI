const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createEventValidation, validate } = require('../middlewares/validator');
const { CheckUrlInCache } = require('../middlewares/redisMiddleware');
const auth = require('../middlewares/authorization');
const adminAuth = require('../middlewares/adminAuthorization');

const { uploadCover } = require('../middlewares/upload-images');

router.get('/', CheckUrlInCache, eventController.searchEvent);
router.post(
  '/',
  auth,
  uploadCover.single('cover'),
  createEventValidation,
  validate,
  eventController.createEvent
);
router.get('/filter', CheckUrlInCache, eventController.filterEvent);
router.put('/:id', auth, createEventValidation(), validate, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.get('/:id', eventController.getEventByID);
router.put('/:id/ban', adminAuth, eventController.banEvent);
router.put('/:id/unban', adminAuth, eventController.unbanEvent);

module.exports = router;
