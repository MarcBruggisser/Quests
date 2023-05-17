import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {createQuestApi, modifyQuestApi, modifySubquestApi, deleteQuestApi} from '../../functions/QuestsFunctions';
import {getAllUniversesApi} from '../../functions/UniversesFunctions';
import Trash from './../../assets/img/trash.svg';
import plusCircle from './../../assets/img/plus_circle.svg';

export default function Quest() {

  let idQuest = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [infosQuest, setInfosQuest] = useState();
  const [currentUniverse, setCurrentUniverse] = useState();
  const [infosSubquests, setInfosSubquests] = useState();
  const [allUniverses, setAllUniverses] = useState();
  let inputHasFocus = false;

  useEffect( () => {

    axios.get(`http://localhost:3000/api/quests/${idQuest}`)
      .then( (response) => { setInfosQuest(response.data); setCurrentUniverse(response.data.universe); })
    axios.get(`http://localhost:3000/api/universes`)
      .then( (response) => setAllUniverses(response.data) )
    axios.get(`http://localhost:3000/api/quests/subquests/${idQuest}`)
      .then( (res) => {setInfosSubquests(res.data); setIsLoading(false); })

  }, [isLoading]);

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
    modifyQuestApi(idQuest, newUniverse);
  }

  // Open window to add a subquest
  const openSubQuestWindow = () => {
    document.querySelector(".subquest_input_container ").classList.toggle("open");
    document.querySelector(".subquest_input").focus();

    if( inputHasFocus === false ) inputHasFocus = true;
    else inputHasFocus = false;
  }
  // Add a subquest
  const addSubQuests = (e) => {
    if(  inputHasFocus === true && e.key === "Enter" ){

      let newSubQuest = { name: document.querySelector(".subquest_input").value, idParent: idQuest, idRoot: idQuest }

      let subQuestItem = document.createElement("li"); subQuestItem.classList.add("subquest"); subQuestItem.classList.add("unfinished");
      subQuestItem.innerHTML = `
        <input type="checkbox" class="validate_quest" />
        <span>${newSubQuest.name}</span>`;
      subQuestItem.querySelector("span").addEventListener("click", modifyQuest);
      document.querySelector(".quests").appendChild(subQuestItem);
      if (document.querySelector(".no_subquests")) document.querySelector(".no_subquests").style.display = "none";

      document.querySelector(".subquest_input").value = ""; document.querySelector(".subquest_input_container").classList.remove("open");

      // backend
      let subquest = newSubQuest;

      createQuestApi(subquest);
    } 
  }
  const finishSubquest = (e) => {
    modifyQuestApi(e.target.nextSibling.getAttribute("data-id"), {finished: e.target.checked})
  }
  
  // modifiy a quest
  const modifyQuest = (e) => {  
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
        if (e.target.classList.contains("quest_subquest")) { modifyValue = { name: newValue, subquestId: e.target.getAttribute("data-id"), action: 0}; }
        // Le code ne fonctionne pas avec la modif d'une sous-quête car on n'a pas acté le cas de figure où l'élément cliqué a la classe subquest
      }
      // If the enter key is pressed, we assign the new name to the list and close the input to change the name, API call happens here
      else{ 
        // Front
        modifyInput.remove(); e.target.style.display = "inline-block"; e.target.textContent = newValue;
        // Back : API call PUT to modify the Quest
        if (e.target.classList.contains("quest_subquest")){ modifySubquestApi(modifyValue);}
        else modifyQuestApi(modifyValue);
      }
    })

  }
  const deleteQuest = (e) => {
    // Backend : API call
    deleteQuestApi(e.target.previousSibling.getAttribute("data-id"));
    // Frontend : Node removal
    e.target.parentNode.remove();
  }

  if(isLoading) return <div>Loading</div>

  return (
    <>
      <main className="quest_section">

        {/* Quest infos */}
        <div className="infos" data-universe={currentUniverse}>
          <h1 className='quest_name' onClick={modifyQuest}>{infosQuest.name}</h1>
          <p className='quest_description' onClick={modifyQuest}>{infosQuest.description}</p>
        </div>

        {/* Actions to be made inside of quest */}
        <div className="actions">
          <span className='add_button add_universe' onClick={openUniverseChangeWindow}>Univers : {currentUniverse}</span>
          <ul className="universe_choice">
            { allUniverses.map( universe => <li key={universe._id} onClick={changeUniverse}>{universe.name}</li>) }
          </ul>
          <span className='add_button add_quest' onClick={openSubQuestWindow}>+ Ajoutez une sous-quête</span>
          <div className="subquest_input_container">
            <input className='subquest_input' type="text" onKeyDown={addSubQuests}/>
          </div>
        </div>
        
        {/* Subquests */}
        <ul className="quests">
          {
            infosSubquests.map( subquest => 
              <li key={subquest._id} className="subquest">
                {subquest.finished === true ? 
                  <input type="checkbox" defaultChecked className='finishToggler' onClick={finishSubquest} /> 
                  : 
                  <input type="checkbox" className='finishToggler' onClick={finishSubquest} />
                }
                <span className='quest_subquest' data-id={subquest._id} onClick={modifyQuest}>{subquest.name}</span>
                <img src={plusCircle} alt="trash" className="add_subquest" onClick={deleteQuest} />
                <img src={Trash} alt="trash" className="delete_subquest" onClick={deleteQuest} />
              </li> 
            )
          }
        </ul>

      </main>
    </>
  )
}
