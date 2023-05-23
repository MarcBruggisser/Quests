import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {createQuestApi, modifyQuestApi, deleteQuestApi} from '../../functions/QuestsFunctions';
import {dataToBeReturned} from '../../functions/QuestsFunctions';
import {getAllUniversesApi} from '../../functions/UniversesFunctions';
import Trash from './../../assets/img/trash.svg';
import plusCircle from './../../assets/img/plus_circle.svg';
import arrowHead from './../../assets/img/arrowhead.svg';
import Subquest from '../../composants/Subquest/Subquest';

export default function Quest() {

  let idQuest = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [infosQuest, setInfosQuest] = useState();
  const [currentUniverse, setCurrentUniverse] = useState();
  const [infosSubquests, setInfosSubquests] = useState();
  const [allUniverses, setAllUniverses] = useState();
  let inputHasFocus = false;

  useEffect( () => {

    // Quest infos
    axios.get(`http://localhost:3000/api/quests/${idQuest}`)
      .then( (response) => { setInfosQuest(response.data); setCurrentUniverse(response.data.universe); })
    // Universes list
    axios.get(`http://localhost:3000/api/universes`)
      .then( (response) => setAllUniverses(response.data) )
    // Subquests list
    axios.get(`http://localhost:3000/api/quests/subquests/${idQuest}`)
      .then( (res) => {
        // Réorganize subquests Array to put children in a tree structure
        let newSubquestHierarchy = [];
        res.data.forEach( (subquest) => {
          subquest.children = [];
          if( subquest.idParent === idQuest ){ newSubquestHierarchy.push( subquest ); }
          if( subquest.idParent != idQuest ){
            res.data.forEach( (parentSubquest) => {
              if( parentSubquest._id === subquest.idParent ){ parentSubquest.children.push( subquest); }
            })
          }
        })
        setInfosSubquests(newSubquestHierarchy); setIsLoading(false); 
      })

  }, [isLoading]);

  // Open window to change quest universe
  const openUniverseChangeWindow = () => {
    document.querySelector(".universe_choice").classList.toggle("open");
  }
  // Once the window is opened, change quest universe
  const changeUniverse = (e) => {
    // Modifs côté front
    let newUniverse = {idQuest: idQuest, universe: e.target.textContent};
    setCurrentUniverse(e.target.textContent);
    document.querySelector(".universe_choice").classList.remove("open");
    // Appel API
    modifyQuestApi(newUniverse);
  }

  let idQuestToAddSubquest;
  const openSubQuestWindow = (e) => {
    if( e.target.classList.contains("add_button") ){
      idQuestToAddSubquest = idQuest;
      document.querySelector(".subquest_input_container").classList.toggle("open");
      document.querySelector(".subquest_input").focus();
    } else{
      idQuestToAddSubquest = e.target.closest(".subquest").querySelector(".subquest_infos").getAttribute("data-id");
      e.target.closest(".subquest").querySelector(".subquest_input_container").classList.add("open");
      e.target.closest(".subquest").querySelector(".subquest_input").focus();
    }
    
    if( inputHasFocus === false ) inputHasFocus = true;
    else inputHasFocus = false;
  }
  // Add a subquest
  const addSubQuests = (e) => {
    if(  inputHasFocus === true && e.key === "Enter" ){ 

      // backend
      let newSubQuest = { idParent: idQuestToAddSubquest, idRoot: idQuest }
      if( idQuestToAddSubquest === idQuest){ newSubQuest.name = document.querySelector(".subquest_input").value;}
      else{ newSubQuest.name = e.target.closest(".subquest").querySelector(".subquest_input").value;}

      axios.post(`http://localhost:3000/api/quests`, newSubQuest)
        .then( (res) => { 
          let subQuestItem = document.createElement("div"); subQuestItem.classList.add("subquest");
          subQuestItem.innerHTML = `
          <div class="subquest_infos" data-id=${res.data._id}>
            <img src=${arrowHead} alt="arrow head" class='subquest_display' />
            <input type="checkbox" class="finishToggler" />
            <span class="quest_subquest">${newSubQuest.name}</span>
            <img src=${plusCircle} alt="plus" class="add_subquest" />
            <img src=${Trash} alt="trash" class="delete_subquest" />
          </div>
          <div class="subquest_input_container">
              <input class="subquest_input" type="text" />
          </div>`;
          if( idQuestToAddSubquest === idQuest){document.querySelector(".quests").appendChild(subQuestItem);} 
          else{ e.target.closest(".subquest").appendChild(subQuestItem); e.target.parentNode.classList.remove("open");}

          subQuestItem.querySelector("span").addEventListener("click", modifyQuest);
          subQuestItem.querySelector(".add_subquest").addEventListener("click", openSubQuestWindow);
          subQuestItem.querySelector(".delete_subquest").addEventListener("click", deleteSubquest);
          subQuestItem.querySelector(".subquest_input").addEventListener("keyup", addSubQuests);
        })
        .catch( err => console.log(err))

      if (document.querySelector(".no_subquests")) document.querySelector(".no_subquests").style.display = "none";

      document.querySelector(".subquest_input").value = ""; document.querySelector(".subquest_input_container").classList.remove("open"); inputHasFocus = false;
    }
  }
  // modifiy a quest
  const modifyQuest = (e) => {
    e.target.style.display = "none"; let modifyInput = document.createElement("input");
    e.target.after(modifyInput); modifyInput.value = e.target.textContent; modifyInput.focus();
    let newValue;
    let modifyValue = {idQuest: idQuest};
    if( e.target.closest(".subquest") != null ) {
      modifyValue.idQuest = e.target.closest(".subquest").querySelector(".subquest_infos").getAttribute("data-id");
      console.log(modifyValue);
    }

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
        
        if (e.target.classList.contains("quest_name") || e.target.classList.contains("quest_subquest")) { modifyValue.name = newValue}
        if (e.target.classList.contains("quest_description")) { modifyValue.description = newValue }
        // Le code ne fonctionne pas avec la modif d'une sous-quête car on n'a pas acté le cas de figure où l'élément cliqué a la classe subquest
      }
      // If the enter key is pressed, we assign the new name to the list and close the input to change the name, API call happens here
      else{
        // Front
        modifyInput.remove(); e.target.style.display = "inline-block"; e.target.textContent = newValue;
        // Back : API call PUT to modify the Quest
        modifyQuestApi(modifyValue);
      }
    })

  }
  const deleteSubquest = (e) => {
    // Backend : API call
    deleteQuestApi(e.target.parentNode.getAttribute("data-id"));
    // Frontend : Node removal
    e.target.closest(".subquest").remove();
  }

  if(isLoading) return <div>Loading</div>

  return (
    <>
      <main className="quest_section" data-id={idQuest}>

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
        <div className="quests">
          <Subquest subquestsArray={infosSubquests} idQuest={idQuest} />
        </div>

      </main>
    </>
  )
}