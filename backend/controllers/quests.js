const questSchema = require('../models/quests');

exports.getAllTasks = (req, res) => {
    questSchema.find()
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.getOneTask = (req, res) => {
    questSchema.findOne({ _id: req.params.id })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.createTask = (req, res) => {

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

exports.modifyTask = (req, res) => {
    questSchema.findOneAndUpdate({ _id: req.params.id })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.deleteTask = (req, res) => {
    questSchema.deleteOne({ _id: req.params.id })
        .then( res.send("Quête supprimée"))
        .catch( err => res.send(err))
};