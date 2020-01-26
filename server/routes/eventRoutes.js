const express = require('express');
const EventController = require('../controllers/eventController');

const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/events', EventController.getListEvents);

module.exports = router;