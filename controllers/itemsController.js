const asyncHandler = require('express-async-handler');

const Item = require('../models/item')

exports.itemList = asyncHandler(async (req, res, next) => {
    const items = await Item.find().exec();

    res.render('itemList', {
        title: 'Item List',
        items: items,
    })
})

exports.itemDetails = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({_id: req.params.id}).populate('category').exec();

    res.render('itemDetails', {
        title: item.name,
        price: item.price,
        description: item.description,
        numberInStock: item.numberInStock,
        category: item.category,
    })
})