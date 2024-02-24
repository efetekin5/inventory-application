const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
        description: currentCategory.description,
    })
})

exports.createCategoryGet = asyncHandler(async (req, res, next) => {
    res.render('categoryForm', {
        title: "Create New Category",
    })
})

exports.createCategoryPost = [
    body('name')
        .trim()
        .isLength({min: 1})
        .escape(),
    body('description')
        .trim()
        .isLength({min: 1})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const categoryName = req.body.name;
        const categoryDescription = req.body.description;

        if(!errors.isEmpty()) {
            res.render('categoryForm', {
                title: 'Create Category',
                name: categoryName,
                description: categoryDescription,
                errors: errors.array(),
            })
        } else {
            const newCategory = new Category({
                name: categoryName,
                description: categoryDescription,
            })

            await newCategory.save();
            res.redirect('/categories');
        }
    })
]