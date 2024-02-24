const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.itemList);

router.get('/:id', itemsController.itemDetails);

router.get('/item/create', itemsController.itemCreateGet);

module.exports = router;