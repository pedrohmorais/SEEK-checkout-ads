const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = mongoose.Schema({
    name: String,
    privileges: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);