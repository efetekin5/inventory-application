const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.categoryList)

router.get('/:id', categoriesController.categoryDetails)

module.exports = router;