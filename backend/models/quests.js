const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    universe: {
        type: String,
        default: "Indéfini"
    },
    finished: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Quest', questSchema);