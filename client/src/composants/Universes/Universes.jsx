import React from 'react';
import axios from 'axios';

export default function Test( props ) {

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

  const hideSubUniverses = (e) => {
    e.stopPropagation();
    let children = e.target.children;
    for (let all of children) {
        if ( all.classList.contains("sub_universe") ) all.classList.toggle("hidden");
    }
  }

  return (
    <>
        {
            <div className={`universe ${props.className}`} data-id={props._id} draggable={true} onClick={hideSubUniverses} onDragStart={clickForDrag} onDragEnd={clickForDrag} onDragEnter={clickForDrag}>
              <strong>{props.name}</strong>

              {
                props.children? 
                  props.children.map( subUniverse => <Test key={subUniverse._id} {...subUniverse} className="sub_universe" /> )
                  :
                  null
              }
            </div> 
        }
    </>
  )
}
