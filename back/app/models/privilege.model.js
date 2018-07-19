const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivilegeSchema = mongoose.Schema({
    type: String,
    description: String,
    product: Schema.Types.ObjectId,
    take: Number,
    pay: Number,
    minAmount: Number,
    priceTo: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Privilege', PrivilegeSchema);