const mongoose = require('mongoose');

const PrivilegeSchema = mongoose.Schema({
    type: String,
    description: String,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    take: Number,
    pay: Number,
    minAmount: Number,
    priceTo: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Privilege', PrivilegeSchema);