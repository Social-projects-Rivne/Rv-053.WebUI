const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/users', adminController.getAllUsersOrSearch);

module.exports = router;