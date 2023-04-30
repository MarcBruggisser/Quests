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

  // Function with API call PUT to modify the Quest
  const modifyQuest = (questChanger) => {
    axios.put(`http://localhost:3000/api/quests/${idQuest}`, questChanger)
      .then( ( res ) => {
        console.log("Quête modifiée");
      })
  }

  // Open window to change quest universe
  const openUniverseChangeWindow = () => {
    document.querySelector(".universe_choice").classList.toggle("open");
  }
  
  // Once the window is opened, change quest universe
  const changeUniverse = (e) => {
    // Modifs côté front
    let newUniverse = {universe: e.target.textContent};
    setCurrentUniverse(e.target.textContent);
    document.querySelector(".universe_choice").classList.remove("open");
    // Appel API
    modifyQuest(newUniverse);
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
    e.target.style.display = "none"; let modifyInput = document.createElement("input");
    e.target.after(modifyInput); modifyInput.value = e.target.textContent; modifyInput.focus();
    let newValue;
    let modifyValue;

    // Côté front :
    modifyInput.addEventListener("keyup", (keyup) => {
      // If the escape key is pressed, the input to change the name disappears and no changes are made
      if( keyup.key === "Escape" ) { 
        modifyInput.remove();
        e.target.style.display = "inline-block";
      }
      // If neither escape nor Enter are pressed the newValue name for the quest is changed at each key press
      else if( keyup.key != "Enter" ) {
        // New quest name is the combination of all the keys pressed
        newValue = keyup.target.value;
        // Some of the keys need to be excluded though
        let keysToRemove = ["Backspace", "Control", "Alt", "CapsLock", "Shift", "Unidentified", "AltGraph", "Tab", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Graph", "ContextMenu", "Meta", "Delete", "Home", "End", "PageUp", "PageDown", "Insert", "NumLock"];
        // For all of the keys, we remove them from the new name of the quest
        keysToRemove.forEach( (key) => newValue = newValue.replace(key, "") )
        
        if (e.target.classList.contains("quest_name")) { modifyValue = { name: newValue} }
        if (e.target.classList.contains("quest_description")) { modifyValue = { description: newValue} }
        // if (e.target.classList.contains("subquest")) { modifyValue = { description: newValue} }
        // Le code ne fonctionne pas avec la modif d'une sous-quête car on n'a pas acté le cas de figure où l'élément cliqué a la classe subquest
      }
      // If the enter key is pressed, we assign the new name to the list and close the input to change the name, API call happens here
      else{ 
        // Front
        modifyInput.remove(); e.target.style.display = "block"; e.target.textContent = newValue;
        // Back : API call PUT to modify the Quest
        modifyQuest(modifyValue);
      }
    })

  }

  if(isLoading) return <div>Loading</div>

  return (
    <>
      <main className="quest_section">

        <div className="infos" data-universe={currentUniverse}>
          <h1 className='quest_name' onClick={modifySubQuest}>{infosQuest.name}</h1>
          <p className='quest_description' onClick={modifySubQuest}>{infosQuest.description}</p>
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
      </main>
    </>
  )
}
