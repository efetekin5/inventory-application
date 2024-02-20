const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, reqired: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, reqired: true },
    numberInStock: { type: Number }
})

itemSchema.virtual('url').get(function () {
   return `/items/${this._id}`;
})

module.exports = mongoose.model('Item', itemSchema)