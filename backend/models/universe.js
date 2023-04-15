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
    parents: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Universe', universeSchema);