const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.categoryList);

router.get('/category/:id', categoriesController.categoryDetails);

router.get('/create', categoriesController.createCategoryGet);

router.post('/create', categoriesController.createCategoryPost);

router.get('/category/:id/delete', categoriesController.deleteCategoryGet);

router.post('/category/:id/delete', categoriesController.deleteCategoryPost);

module.exports = router;