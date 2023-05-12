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
    comments: {
        type: [Object]
    },
    finished: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    subquests: {
        type: Array,
        default: [Object]
    }
})

module.exports = mongoose.model('Quest', questSchema);