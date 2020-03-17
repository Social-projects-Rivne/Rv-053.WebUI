const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createEventValidation, validate } = require('../middlewares/validator');
const { CheckUrlInCache } = require('../middlewares/redisMiddleware');
const auth = require('../middlewares/authorization');
const adminAndModeratorAuth = require('../middlewares/adminAndModeratorAuthorization');

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
router.put('/:id/reject', adminAndModeratorAuth, eventController.rejectEvent);
router.put('/:id/activate', adminAndModeratorAuth, eventController.activateEvent);
router.put('/:id/delete', adminAndModeratorAuth, eventController.deleteEvent);
router.get('/:id/count', eventController.getQuantityFollowedOnEventUsers);
router.get('/feedback/:id', eventController.getFeedbacks);
router.post('/feedback/:userId/:eventId', auth, eventController.leaveFeedback);
router.delete('/feedback/:id', auth, eventController.deleteFeedback);
router.put('/feedback/:id', auth, eventController.updateFeedback);

module.exports = router;
