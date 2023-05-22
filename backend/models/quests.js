const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "none"
    },
    universe: {
        type: String,
        default: "Indéfini"
    },
    idParent: {
        type: String,
        default: "none"
    },
    idRoot: {
        type: String,
        default: "none"
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
    }
})

module.exports = mongoose.model('Quest', questSchema);