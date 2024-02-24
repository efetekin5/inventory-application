const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.categoryList);

router.get('/category/:id', categoriesController.categoryDetails);

router.get('/create', categoriesController.createCategory);

module.exports = router;