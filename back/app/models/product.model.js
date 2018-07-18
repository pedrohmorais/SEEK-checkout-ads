const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productId: String,
    name: String,
    price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);