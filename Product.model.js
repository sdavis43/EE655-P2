const mongoose = require('mongoose');
const Schema =  mongoose.Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: Number,
    price: Number,
});
module.exports = mongoose.model('Product', ProductSchema)
