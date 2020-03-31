const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createEventValidation, validate } = require('../middlewares/validator');
//const { CheckUrlInCache } = require('../middlewares/redisMiddleware');
const auth = require('../middlewares/authorization');
const adminAndModeratorAuth = require('../middlewares/adminAndModeratorAuthorization');

const {
  uploadCover,
  uploadImageOfGallery
} = require('../middlewares/upload-images');

router.get('/', eventController.searchEvent);
router.post(
  '/',
  auth,
  uploadCover.single('cover'),
  createEventValidation(),
  validate,
  eventController.createEvent
);
router.put(
  '/:id',
  auth,
  uploadCover.single('cover'),
  createEventValidation(),
  validate,
  eventController.updateEvent
);
router.delete('/:id', auth, eventController.deleteEvent);
router.get('/:id', eventController.getEventByID);
router.put('/:id/reject', adminAndModeratorAuth, eventController.rejectEvent);
router.put(
  '/:id/activate',
  adminAndModeratorAuth,
  eventController.activateEvent
);
router.put('/:id/delete', adminAndModeratorAuth, eventController.deleteEvent);
router.get('/:id/count', eventController.getQuantityFollowedOnEventUsers);
router.get('/:id/gallery', eventController.getGalleryOfEvent);
router.get('/feedback/:id', eventController.getFeedbacks);
router.post('/feedback/:userId/:eventId', auth, eventController.leaveFeedback);
router.delete('/feedback/:id', auth, eventController.deleteFeedback);
router.put('/feedback/:id', auth, eventController.updateFeedback);
router.post(
  '/:id/gallery',
  auth,
  uploadImageOfGallery.single('img_url'),
  eventController.createImageOfGallery
);
router.put(
  '/:id/gallery/:imageId',
  auth,
  uploadImageOfGallery.single('img_url'),
  eventController.changeImageOfGallery
);
router.delete(
  '/:id/gallery/:imageId',
  auth,
  eventController.deleteImageFromGallery
);

module.exports = router;
