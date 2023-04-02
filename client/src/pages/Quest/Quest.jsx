import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Quest() {

  let idQuest = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [infosQuest, setInfosQuest] = useState();
  const [currentUniverse, setCurrentUniverse] = useState();
  const [allUniverses, setAllUniverses] = useState();
  let inputHasFocus = false;

  useEffect( () => {

    axios.get(`http://localhost:3000/api/quests/${idQuest}`)
      .then( (response) => { setInfosQuest(response.data); setCurrentUniverse(response.data.universe); })
    axios.get(`http://localhost:3000/api/universes`)
      .then( (response) => {
        setAllUniverses(response.data);
        setIsLoading(false);
      })

  }, [isLoading]);

  // Open window to change quest universe
  const openUniverseChangeWindow = () => {
    document.querySelector(".universe_choice").classList.toggle("open");
  }
  
  // Once the window is opened, change quest universe
  const changeUniverse = (e) => {
    let newUniverse = {name: e.target.textContent};
    setCurrentUniverse(e.target.textContent);

    axios.put(`http://localhost:3000/api/quests/${idQuest}`, newUniverse)
      .then( ( res ) => {
        console.log(res.data.universe);
      })
    document.querySelector(".universe_choice").classList.remove("open");
  }

  // Open window to add a subquest
  const openSubQuestWindow = () => {
    document.querySelector(".subquest_input_container ").classList.toggle("open");
    document.querySelector(".subquest_input").focus();

    if( inputHasFocus === false ) inputHasFocus = true;
    else inputHasFocus = false;
  }

  // Add a subquest
  const addSubQuest = (e) => {
    if(  inputHasFocus === true && e.key === "Enter" ){

      let newSubQuest = { name: document.querySelector(".subquest_input").value }

      let subQuestItem = document.createElement("li");
      subQuestItem.classList.add("subquest");
      subQuestItem.classList.add("unfinished");
      subQuestItem.innerHTML = `
        <input type="checkbox" class="validate_quest" />
        <span>${newSubQuest.name}</span>`;
      subQuestItem.querySelector("span").addEventListener("click", modifySubQuest);
      document.querySelector(".quests").appendChild(subQuestItem);
      document.querySelector(".no_subquests").style.display = "none";

      document.querySelector(".subquest_input").value = "";
      document.querySelector(".subquest_input_container").classList.remove("open");
    } 
  }
  
  // modifiy a subquest
  const modifySubQuest = (e) => {
    e.target.style.display = "none";
    let modifyInput = document.createElement("input");
    e.target.parentNode.appendChild(modifyInput);
    modifyInput.value = e.target.textContent;
    modifyInput.focus();
    let newValue;

    // Côté front
    modifyInput.addEventListener("keydown", (keydown) => {
      // If the escape key is pressed, the input to change the name disappears and no changes are made
      if( keydown.key === "Escape" ) { 
        modifyInput.remove();
        e.target.style.display = "inline-block";
      }
      // If backspace key is pressed, the remove last character from the string of the input
      else if( keydown.key === "Backspace" ){
        newValue = keydown.target.value.slice(0, -1);
      }
      // If neither escape nor Enter are pressed the newValue name for the quest is changed at each key press
      else if( keydown.key != "Enter" ) {

        // New quest name is the combination of all the keys pressed
        newValue = keydown.target.value + keydown.key;
        // Some of the keys need to be excluded though
        let keysToRemove = ["Control", "Alt", "CapsLock", "Shift", "Unidentified", "AltGraph", "Tab", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Graph", "ContextMenu", "Meta", "Delete", "Home", "End", "PageUp", "PageDown", "Insert", "NumLock"];
        // For all of the keys, we remove them from the new name of the quest
        keysToRemove.forEach( (key) => newValue = newValue.replace(key, "") )
        console.log(newValue);
      } 
      // If the enter key is pressed, we assign the new name to the list and close the input to change the name
      else{ 
        modifyInput.remove();
        e.target.style.display = "inline-block";
        e.target.textContent = newValue;
      }
    })
    // Côté back
  }

  if(isLoading) return <div>Loading</div>

  return (
    <>
      <section className="quest_section">

        <div className="infos" data-universe={currentUniverse}>
          <h1>{infosQuest.name}</h1>
          <p>{infosQuest.description}</p>
        </div>

        <div className="actions">
          <span className='add_button add_universe' onClick={openUniverseChangeWindow}>Univers : {currentUniverse}</span>
          <ul className="universe_choice">
            { allUniverses.map( universe => <li key={universe._id} onClick={changeUniverse}>{universe.name}</li>) }
          </ul>
          <span className='add_button add_quest' onClick={openSubQuestWindow}>+ Ajoutez une sous-quête</span>
          <div className="subquest_input_container">
            <input className='subquest_input' type="text" onKeyDown={addSubQuest}/>
          </div>
        </div>

        <ul className="quests">
        { infosQuest.subquests.length != 0? 
          <li className='subquest'>
            <input type="checkbox" class="validate_quest" />
            <span onClick={modifySubQuest}>{newSubQuest.name}</span>
          </li>
          :
          <li className='no_subquests'>Circulez, y'a rien à voir</li>
        }
        </ul>
      </section>
    </>
  )
}
