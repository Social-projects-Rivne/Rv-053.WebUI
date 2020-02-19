const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

const { createEventValidation, validate } = require('../middlewares/validator');
const { CheckUrlInCache } = require('../middlewares/redisMiddleware');
const auth = require('../middlewares/authorization');

router.get('/', auth, CheckUrlInCache, eventController.searchEvent);
router.post('/', auth, createEventValidation(), validate, eventController.createEvent);

router.get('/:id', auth, CheckUrlInCache, eventController.getEventByID);
router.delete('/:id', auth, eventController.deleteEvent);
router.put('/:id', auth, createEventValidation(), validate, eventController.updateEvent);

module.exports = router;
