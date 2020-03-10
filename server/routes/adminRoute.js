const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/users', adminController.getAllUsersOrSearch);
router.get('/events', adminController.getAllEventsOrSearch);
router.get('/getrole', adminController.getUserRoleFromReq);

module.exports = router;
