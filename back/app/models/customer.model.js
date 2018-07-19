const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    privileges: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);