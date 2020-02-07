const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

// Search event by name or description/get all event 
router.get('/', eventController.searchEvent);
// Create new event
router.post('/', eventController.createEvent);
// Get info about current event by id
router.get('/:id', eventController.getEventByID);

module.exports = router;