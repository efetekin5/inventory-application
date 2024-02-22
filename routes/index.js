const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController')

/* GET home page. */
router.get('/', categoriesController.index);

module.exports = router;
