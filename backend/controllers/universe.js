const universeSchema = require('../models/universe');

exports.getAllUniverses = (req, res) => {
    universeSchema.find()
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.getOneUniverse = (req, res) => {
    universeSchema.findOne({ name: req.body.name })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.createUniverse = (req, res) => {

    universeSchema.find()
        .then( response => {
            let hasValue = false;
   
            response.forEach( (universe) => {
                if ( universe.name === req.body.name ) {
                    console.log("Cet univers existe déjà");
                    hasValue = true;
                }
            })
            if( hasValue === false ) {
                const universe = new universeSchema({
                    name: req.body.name,
                    description: req.body.description
                })
                universe.save()
                    .then( () => {
                        console.log("Univers créée")
                        res.send(universe);
                    })
                    .catch( () => console.log("Erreur"))
            }
        })

};

exports.modifyUniverse = (req, res) => {
    universeSchema.findOneAndUpdate({ name: req.body.name })
        .then( response =>  res.json(response))
        .catch( err => console.log(err))
};

exports.deleteUniverse = (req, res) => {
    universeSchema.deleteOne({ name: req.body.name })
        .then( res.send("Quête supprimée"))
        .catch( err => res.send(err))
};