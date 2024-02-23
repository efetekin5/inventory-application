const asyncHandler = require('express-async-handler');

const Item = require('../models/item')

exports.itemList = asyncHandler(async (req, res, next) => {
    const items = await Item.find().exec();

    res.render('itemList', {
        title: 'Item List',
        items: items,
    })
})