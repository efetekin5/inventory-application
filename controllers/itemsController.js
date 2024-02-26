const asyncHandler = require('express-async-handler');

const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

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
        url: item.url,
    })
})

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec();
    res.render('itemForm', {
        title: 'Create New Item',
        categories: categories
    })
})

exports.itemCreatePost = [
    body('category')
        .trim()
        .isLength({min: 1})
        .escape(),
    body('name')
        .trim()
        .isLength({min: 1})
        .escape(),
    body('description')
        .trim()
        .isLength({min: 1})
        .escape(),
    body('price')
        .notEmpty()
        .isInt({min: 0})
        .withMessage('Lowest price must be 0'),
    body('numberInStock')
        .notEmpty()
        .isInt({min: 0})
        .withMessage('Lowes number in stock must be 0'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const categories = await Category.find().exec();

        const itemCategoryId = req.body.category;
        const itemCategory = await Category.findOne({_id: itemCategoryId}).exec();

        const itemName =req.body.name;
        const itemDescription = req.body.description;
        const itemPrice = req.body.price;
        const itemStock = req.body.numberInStock;

        if(!errors.isEmpty()) {
            res.render('itemForm', {
                title: 'Create New Item',
                categories: categories,
                itemCategoryId: itemCategoryId,
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                numberInStock: itemStock,
                errors: errors.array(),
            })
        } else {
            const newItem = new Item({
                category: itemCategory,
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                numberInStock: itemStock,
            })

            await newItem.save();
            res.redirect('/items');
        }
    })
];

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
    const itemToDelete = await Item.findById(req.params.id).exec();

    res.render('itemDelete', {
        name: itemToDelete.name
    })
})

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
})