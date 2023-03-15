const projectSchema = require('../models/projects');

exports.getAllProjects = (req, res) => {
    projectSchema.find()
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.getOneProject = (req, res) => {
    projectSchema.findOne({ _id: req.params.id })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.createProject = (req, res) => {

    const project = new projectSchema({
        name: req.body.name,
        description: req.body.description
    })
    project.save()
        .then( () => {
            console.log("Tâche créée")
            res.send(project);
        })
        .catch( () => console.log("Erreur"))
};

exports.modifyProject = (req, res) => {
    projectSchema.findOneAndUpdate({ _id: req.params.id })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.deleteProject = (req, res) => {
    projectSchema.deleteOne({ _id: req.params.id })
        .then( res.send("Quête supprimée"))
        .catch( err => res.send(err))
};