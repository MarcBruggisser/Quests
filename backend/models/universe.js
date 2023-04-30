const mongoose = require('mongoose');

const universeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    root: {
        type: Boolean,
        default: true
    },
    parent: {
        type: String,
        default: "none"
    },
    orderToBeDisplayed: {
        type: Number
    }
})

module.exports = mongoose.model('Universe', universeSchema);