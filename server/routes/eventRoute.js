const express = require('express');
const EventController = require('../controllers/eventController');

const router = express.Router();
const auth = require('../middlewares/authorization');

router.get('/events', EventController.getAllEvent);
router.get('/events/:id', EventController.getEventByID);


module.exports = router;