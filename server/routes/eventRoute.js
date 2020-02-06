const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.get('/', eventController.getAllEvent);
router.post('/create', eventController.createEvent);
router.get('/:id', eventController.getEventByID);

router.get("/?", eventController.searchEvent);

module.exports = router;