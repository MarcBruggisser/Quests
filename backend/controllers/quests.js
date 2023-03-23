const questSchema = require('../models/quests');

exports.getAllQuests = (req, res) => {
    questSchema.find()
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.getOneQuest = (req, res) => {
    questSchema.findOne({ _id: req.params.id })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.createQuest = (req, res) => {

    const quest = new questSchema({
        name: req.body.name,
        description: req.body.description
    })
    quest.save()
        .then( () => {
            console.log("Tâche créée")
            res.send(quest);
        })
        .catch( () => console.log("Erreur"))
};

exports.modifyQuest = (req, res) => {
    questSchema.findOneAndUpdate({ _id: req.params.id }, {universe: req.body.name})
        
        .then( response => res.json(response).status(200) )
        .catch( err => console.log(err))
};

exports.deleteQuest = (req, res) => {
    questSchema.deleteOne({ _id: req.params.id })
        .then( res.send("Quête supprimée"))
        .catch( err => res.send(err))
};