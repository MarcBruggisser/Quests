const mongoose = require('mongoose');

const questSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    univers: {
        type: Object,
        default: {
            name:"Indéfini", 
            questList: ["Pas de quête pour l'instant"]
        }
    },
    finished: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Quest', questSchema);