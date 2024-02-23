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

exports.categoryDetails = asyncHandler(async (req, res, next) => {
    const currentCategory = await Category.findOne({_id: req.params.id}).exec();

    const categoryItems = await Item.find({category: currentCategory}).exec();

    res.render('categoryDetails', {
        title: currentCategory.name,
        categoryItems: categoryItems,
    })
})