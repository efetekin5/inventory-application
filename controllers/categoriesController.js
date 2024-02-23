const asyncHandler = require('express-async-handler');

const Category = require('../models/category');
const Item = require('../models/item');

exports.index = asyncHandler(async (req, res, next) => {
    const categoryCount = await Category.countDocuments().exec();
    const itemCount = await Item.countDocuments().exec();

    res.render('index', {
        title: 'Inventory Application',
        categoryCount: categoryCount,
        itemCount: itemCount
    })
})

exports.categoryList = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec();

    res.render('categoryList', {
        title: 'Category List',
        categories: categories,
    })
})