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

// Modify quests infos
exports.createQuest = (req, res) => {

    console.log(req.body);

    const quest = new questSchema({
        name: req.body.name,
        description: req.body.description,
        idParent : req.body.idParent,
        idRoot : req.body.idParent
    })
    quest.save()
        .then( () => {
            console.log("Tâche créée")
            res.send(quest);
        })
        .catch( () => console.log("Erreur"))
};

// Modify quests infos
exports.modifyQuest = (req, res) => {

    questSchema.updateOne( { _id: req.params.id }, {...req.body} )
        .then( response => {res.json(response).status(200); console.log(req.body); })
        .catch( err => console.log(err))
};

// Delete quest
exports.deleteQuest = (req, res) => {
    questSchema.deleteOne({ _id: req.params.id })
        .then( res.send("Quête supprimée"))
        .catch( err => res.send(err))
};