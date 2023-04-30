import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';

export default function Universes() {

    const [isLoading, setIsLoading] = useState(true);
    const [allUniverses, setAllUniverses] = useState();

    // API call to get data
    useEffect(() => {

        axios.get(`http://localhost:3000/api/universes`)
        .then( (response) => {
            setAllUniverses(response.data);
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
            let universeChanges;
            if(idHoveredUniverse != undefined && idHoveredUniverse != e.target.getAttribute('data-id')){
                let subUniverse = e.target;
                subUniverse.classList.remove("root"); subUniverse.classList.add("sub_universe");
                hoveredUniverse.append(subUniverse);
                
                // Object to be sent in the HTTP request
                universeChanges = {root : false, parent : idHoveredUniverse};
            }
            if(idHoveredUniverse === null){
                document.querySelector(".main_container").append(e.target);
                e.target.classList.remove("sub_universe"); e.target.classList.add("root");
                // Object to be sent in the HTTP request
                universeChanges = {root : true, parent : "none"};
            }
            axios.put(`http://localhost:3000/api/universes/${e.target.getAttribute('data-id')}`, universeChanges)
                .then( () => console.log("Modification d'univers réussi") )
                .catch( () => console.log("Modification d'univers échouée") )
        }
    }

    const hideSubuniverses = (e) => {
        let children = e.target.children;
        for (let all of children) {
            if ( all.classList.contains("sub_universe") ) all.classList.toggle("hidden");
        }
    }

    return (
        <main className="universes">
            <section>   
                <article className='main_container' onDragEnter={clickForDrag}>
                    { allUniverses.filter(rootUniverses => rootUniverses.root === true).map( (universe) => 
                        <div key={universe.name} className="root" data-id={universe._id} draggable={true} onClick={hideSubuniverses} onDragStart={clickForDrag} onDragEnd={clickForDrag} onDragEnter={clickForDrag}>
                            <strong>{universe.name}</strong>
                            { allUniverses.filter(subUniverses => subUniverses.parent === universe._id).map( (subUniverse) =>
                                <div key={subUniverse.name} className="sub_universe" data-id={subUniverse._id} draggable={true} onDragStart={clickForDrag} onDragEnd={clickForDrag} onDragEnter={clickForDrag}><strong>{subUniverse.name}</strong></div>
                            )
                            }
                        </div>) 
                    }
                </article>
            </section>
        </main>
    )
}
