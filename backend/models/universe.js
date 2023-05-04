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
    isRoot: {
        type: Boolean,
        default: true
    },
    idRoot: {
        type: String,
        default: "none"
    },
    idParent: {
        type: String,
        default: "none"
    },
    idChildren: {
        type: Array,
    },
    orderToBeDisplayed: {
        type: Number
    }
})

module.exports = mongoose.model('Universe', universeSchema);