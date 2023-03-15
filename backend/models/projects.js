const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quests: {
        type: Array
    }
})

module.exports = mongoose.model('Projet', projectSchema);