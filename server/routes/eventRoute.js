const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

const { createEventValidation, validate } = require('../middlewares/validator');

// Search event by name or description/get all event
router.get('/', eventController.searchEvent);
// Create new event
router.post('/', createEventValidation(), validate, eventController.createEvent);
// Get info about current event by id
router.get('/:id', eventController.getEventByID);
router.delete('/:id', eventController.deleteEvent);
router.put('/:id', eventController.updateEvent);

module.exports = router;
