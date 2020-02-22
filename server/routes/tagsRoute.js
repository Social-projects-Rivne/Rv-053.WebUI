const express = require('express');
const route = express.Router();
const tagController = require('../controllers/tagsController');

route.get('/', tagController.getListOfAllCategories);

module.exports = route;
