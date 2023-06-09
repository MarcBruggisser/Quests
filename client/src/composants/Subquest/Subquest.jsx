import React from 'react'
import axios from 'axios';
import {createQuestApi, modifyQuestApi, deleteQuestApi} from '../../functions/QuestsFunctions';
import Trash from './../../assets/img/trash.svg';
import plusCircle from './../../assets/img/plus_circle.svg';
import arrowHead from './../../assets/img/arrowhead.svg';

export default function Subquest( props ) {

    let inputHasFocus = false;
    // Open window to add a subquest
    let idQuestToAddSubquest;
    const openSubQuestWindow = (e) => {
        e.target.closest(".subquest").querySelector(".subquest_input_container").classList.toggle("open");
        e.target.closest(".subquest").querySelector(".subquest_input").focus();
        // Get quest or subquest id
        idQuestToAddSubquest = e.target.parentNode.getAttribute("data-id");
        
        if( inputHasFocus === false ) inputHasFocus = true;
        else inputHasFocus = false;
    }
    const modifySubquest = (e) => {
        e.target.style.display = "none"; let modifyInput = document.createElement("input");
        e.target.after(modifyInput); modifyInput.value = e.target.textContent; modifyInput.focus();
        let newValue;
        let modifyValue = {idQuest: e.target.closest(".subquest").querySelector(".subquest_infos").getAttribute("data-id")};
    
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
            
            if (e.target.classList.contains("quest_subquest")) { modifyValue.name = newValue; }
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
    // Add a subquest
    const addSubQuests = (e) => {
        if(  inputHasFocus === true && e.key === "Enter" ){ 

            let newSubQuest = { name: e.target.value, idParent: idQuestToAddSubquest, idRoot: props.idQuest }
            // backend
            axios.post(`http://localhost:3000/api/quests`, newSubQuest)
                .then( (res) => { 
                    let subQuestItem = document.createElement("div"); subQuestItem.classList.add("subquest"); subQuestItem.classList.add("open");
                    subQuestItem.innerHTML = `<div class="subquest_infos" data-id=${res.data._id}>
                        <img src=${arrowHead} alt="arrow head" class='subquest_display' />
                        <input type="checkbox" class="finishToggler" />
                        <span class="quest_subquest">${newSubQuest.name}</span>
                        <img src=${plusCircle} alt="plus" class="add_subquest" />
                        <img src=${Trash} alt="trash" class="delete_subquest" />
                    </div>
                    <div class="subquest_input_container">
                        <input class="subquest_input" type="text" />
                    </div>`;
                    e.target.closest(".subquest").appendChild(subQuestItem);
                    e.target.value = ""; e.target.parentNode.classList.remove("open"); inputHasFocus = false;
        
                    subQuestItem.querySelector("span").addEventListener("click", modifySubquest);
                    subQuestItem.querySelector(".add_subquest").addEventListener("click", openSubQuestWindow);
                    subQuestItem.querySelector(".delete_subquest").addEventListener("click", deleteSubquest);
                    subQuestItem.querySelector(".subquest_input").addEventListener("keyup", addSubQuests);
                    subQuestItem.querySelector(".subquest_display").addEventListener("click", displaySubquest);

                })
        } 
    }
    const displaySubquest = (e) => {
        // front
        e.target.classList.toggle("hidden"); e.target.closest(".subquest").classList.toggle("open");
        // back
        let changes = {idQuest: e.target.closest(".subquest").querySelector(".subquest_infos").getAttribute("data-id")};
        if( e.target.closest(".subquest").classList.contains("open") ){ changes.isOpen = "open";}
        else { changes.isOpen = "notOpen";}
        modifyQuestApi(changes);

    }
    const finishSubquest = (e) => {
        e.target.closest(".subquest").classList.toggle("finished");
        let modifyInput = {idQuest: e.target.closest(".subquest").querySelector(".subquest_infos").getAttribute("data-id"), finished: e.target.checked}
        modifyQuestApi(modifyInput);
    }
    const deleteSubquest = (e) => {
        let questsToBeDeleted = e.target.closest(".subquest").querySelectorAll(".subquest_infos");
        // Frontend : Node removal
        e.target.closest(".subquest").remove();
        // Backend : API call
        let questsToBeDeletedId = [];
        questsToBeDeleted.forEach( subquest => questsToBeDeletedId.push(subquest.getAttribute("data-id")) )
        deleteQuestApi(questsToBeDeletedId);
    }

    return (
        props.subquestsArray.map( subquest => 
            subquest.finished === true ?
                <div key={subquest._id} className={`subquest finished ${subquest.isOpen}`}>
                    <div className="subquest_infos" data-id={subquest._id}>
                    <img src={arrowHead} alt="arrow head" className='subquest_display' onClick={displaySubquest} />
                        <input type="checkbox" defaultChecked className='finishToggler' onClick={finishSubquest} /> 
                        <span className='quest_subquest' onClick={modifySubquest}>{subquest.name}</span>
                        <img src={plusCircle} alt="plus" className="add_subquest" onClick={openSubQuestWindow} />
                        <img src={Trash} alt="trash" className="delete_subquest" onClick={deleteSubquest} />
                    </div>
                    <div className="subquest_input_container">
                        <input className="subquest_input" type="text" onKeyUp={addSubQuests} />
                    </div>
                    <Subquest subquestsArray={subquest.children} idQuest={props.idQuest} />
                </div>
                :
                <div key={subquest._id} className={`subquest ${subquest.isOpen}`}>
                    <div className="subquest_infos" data-id={subquest._id}>
                        <img src={arrowHead} alt="arrow head" className='subquest_display' onClick={displaySubquest} />
                        <input type="checkbox" className='finishToggler' onClick={finishSubquest} />
                        <span className='quest_subquest' onClick={modifySubquest}>{subquest.name}</span>
                        <img src={plusCircle} alt="plus" className="add_subquest" onClick={openSubQuestWindow} />
                        <img src={Trash} alt="trash" className="delete_subquest" onClick={deleteSubquest} />
                    </div>
                    <div className="subquest_input_container">
                        <input className="subquest_input" type="text" onKeyUp={addSubQuests} />
                    </div>
                    <Subquest subquestsArray={subquest.children} idQuest={props.idQuest} />
                </div>
        )
    )
}
