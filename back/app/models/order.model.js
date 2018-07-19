const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);