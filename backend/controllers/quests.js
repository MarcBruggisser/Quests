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
    // let questsToDelete = [req.params.id]
    // questSchema.find( {idParent: req.params.id} )
    //     .then( response => { 
    //         if(response.length != 0){
    //             console.log(response)
    //             response.forEach( value => {
    //                 deleteQuest(req.params.id === value.id);
    //                 questSchema.findOneAndDelete(value._id)
    //                     .then( () => console.log("Ca a marché")  )
    //             })
    //         }
    //     })
    questSchema.deleteOne({ _id: req.params.id })
        .then( console.log("Quête supprimée"))
        .catch( console.log("Quête non supprimée"))
};