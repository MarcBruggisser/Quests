import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Test from '../../composants/Universes/Universes';

export default function Universes() {

    const [isLoading, setIsLoading] = useState(true);
    const [allUniverses, setAllUniverses] = useState();

    // API call to get data
    useEffect( () => {

        axios.get(`http://localhost:3000/api/universes`)
        .then( (response) => {
            let newOrganisation = [];
            
            response.data.forEach( universe => {
                if( universe.idParent === "none" ) newOrganisation.push(universe)
            });
            response.data.forEach( universe => {
                // Aller chercher dans le tableau des response l'univers qui a l'id du sous-univers avec l'idParent qui lui correspond
                if( universe.idParent != "none" ){
                    response.data.forEach( parentUniverse => {
                        if( parentUniverse._id === universe.idParent ){
                            parentUniverse.children.push(universe);
                        }
                    })
                }
            });
            
            setAllUniverses(newOrganisation);
            setIsLoading(false);
        })          
    
    }, [isLoading]);
    // When data is being fetched
    if(isLoading) return <div>Loading</div>

    let idHoveredUniverse;
    let hoveredUniverse;
    const clickForDrag = (e) => {
        // Lorsque le hover d'un univers rentre à l'intérieur d'un autre
        if(e._reactName === "onDragEnter"){
            hoveredUniverse = e.target;
            // Chercher l'id de l'univers sur lequel il y a hover
            idHoveredUniverse = hoveredUniverse.getAttribute('data-id');
        }
        // Au relâchement du drag and drop
        if(e._reactName === "onDragEnd"){

            // Object to be sent in the HTTP request
            let universeChanges = {};
            
            if(idHoveredUniverse != undefined && idHoveredUniverse != e.target.getAttribute('data-id')){
                let subUniverse = e.target;
                subUniverse.classList.remove("root"); subUniverse.classList.add("sub_universe");
                hoveredUniverse.append(subUniverse);
                
                // Object to be sent in the HTTP request
                universeChanges.universe = {idParent : idHoveredUniverse};
            }
            if(idHoveredUniverse === null){
                document.querySelector(".main_container").append(e.target);
                e.target.classList.remove("sub_universe"); e.target.classList.add("root");
                // Object to be sent in the HTTP request
                universeChanges.universe = {idParent : "none"};
            }
            axios.put(`http://localhost:3000/api/universes/${e.target.getAttribute('data-id')}`, universeChanges)
                .then( () => console.log("Modification d'univers réussi") )
                .catch( () => console.log("Modification d'univers échouée") )
        }
    }

    return (
        <main className="universes">
            <section>
                <article className='main_container' onDragEnter={clickForDrag} onDragEnd={clickForDrag}>
                    {
                        allUniverses.map( (universe, index) => 
                            <Test key={index} name={universe.name} _id={universe._id} className="root" children={universe.children} /> 
                        )
                    }
                </article>
            </section>
        </main>
    )
}
