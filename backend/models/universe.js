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
    idRoot: {
        type: String,
        default: "none"
    },
    idParent: {
        type: String,
        default: "none"
    },
    children: {
        type: Array,
    },
    orderToBeDisplayed: {
        type: Number
    }
})

module.exports = mongoose.model('Universe', universeSchema);