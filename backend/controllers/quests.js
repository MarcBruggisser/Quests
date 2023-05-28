const questSchema = require('../models/quests');

exports.getAllQuests = (req, res) => {
    questSchema.find( {idParent: "none"} )
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.getOneQuest = (req, res) => {
    questSchema.findOne({ _id: req.params.id })
        .then( response => res.json(response))
        .catch( err => console.log(err))
};

exports.getAllSubquests = (req, res) => {
    questSchema.find( {idRoot: req.params.id} )
        .then( response => res.json(response))
};

// Create quests
exports.createQuest = (req, res) => {

    const quest = new questSchema({...req.body });
    quest.save()
        .then( () => { res.json(quest); console.log(req.body); })
        .catch( (err) => console.log(req.body))
};

// Modify quests infos
exports.modifyQuest = (req, res) => {

    questSchema.updateOne( { _id: req.params.id }, {...req.body} )
        .then( response => {res.json(response).status(200); console.log(req.body); })
        .catch( err => console.log(err))
};

// Delete quest
exports.deleteQuest = (req, res) => {
    questSchema.deleteMany({ _id: [...req.body] })
        .then( console.log("Quête supprimée"))
        .catch( console.log("Quête non supprimée"))
    questSchema.deleteMany({ idRoot: [...req.body] })
        .then( console.log("Quête supprimée"))
        .catch( console.log("Quête non supprimée"))
};