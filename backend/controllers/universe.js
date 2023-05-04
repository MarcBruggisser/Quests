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
                        console.log("Univers créé")
                        res.send(universe);
                    })
                    .catch( () => console.log("Erreur"))
            }
        })

};

exports.modifyUniverse = (req, res) => {

    // Trouver d'abord l'univers dans la BDD avant d'en modifier ses données
    universeSchema.findById( req.params.id )
        .then( currentUniverse => { 
            
            // Update for isRoot boolean and id of the universe's parent
            universeSchema.updateOne( { _id: currentUniverse._id }, {...req.body.universe} )
                .then( response => { 
                    res.json(response).status(200) 
                
                    
                    // Once the updates on the universe itself is complete, we change data on the parent of the universe if any
                    // Deux cas de figure : 
                    if( req.body.universe.idParent != "none" ){
                        universeSchema.findById( req.body.universe.idParent )
                            .then( parentUniverse => {

                                if( parentUniverse.idChildren.includes(req.params.id) === false){
                                    universeSchema.updateOne( { _id: req.body.universe.idParent }, { $push: { idChildren: req.params.id } } )
                                        .then( () => console.log("Univers enfant ajouté au parent"))
                                        .catch( () => console.log("Marche pas"))
                                }

                                if( currentUniverse.idParent != "none" ){
                                    universeSchema.updateOne( { _id: currentUniverse.idParent }, { $pull: { idChildren: req.params.id } } )
                                        .then( () => console.log("Univers enfant retiré au parent") )
                                }
                            })
                    }
                    if( req.body.universe.idParent === "none" ){
                            universeSchema.updateOne( { _id: currentUniverse.idParent }, { $pull: { idChildren: req.params.id } } )
                                .then( () => console.log("Univers enfant retiré du parent"))
                                .catch( () => console.log("Marche pas"))
                    }
                })
                .catch( err => console.log(err))
        })
};

exports.resetChildrenUniverses = (req, res) => {
    universeSchema.updateMany( { idChildren: [] } )
        .then( () => console.log("Marche"))
        .catch( () => console.log("Marche pas"))
};

exports.deleteUniverse = (req, res) => {
    universeSchema.deleteOne({ name: req.body.name })
        .then( res.send("Univers supprimée"))
        .catch( err => res.send(err))
};