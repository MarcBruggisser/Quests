import React from 'react';
import {createUniverse} from "../../functions/UniversesFunctions"
import axios from "axios"

export default function QuestManager() {

    const openUniverseWindow = () => {
        document.querySelector(".add_universe_window").classList.toggle("open");
        document.getElementById("universe_title").focus();
    }
    const openQuestWindow = () => {
        document.querySelector(".add_quest_window").classList.toggle("open");
        document.getElementById("quest_title").focus();
    }
    const addNewQuest = (e) => {
        e.preventDefault();
        let questName = document.getElementById("quest_title").value;
        
        if( questName.length === 0 ) questName = "Pas de nom de quête pour le moment";
        let questItem = {name: questName, description:"Pas de description active pour cette quête"};

        axios.post("http://localhost:3000/api/quests", questItem)
            .then( (res) => {
                const newQuest = document.createElement("li");
                newQuest.classList.add("quest");
                newQuest.setAttribute("data", res);
                newQuest.innerHTML = `
                    <strong>${questName}</strong>
                    <p>${questItem.description}</p>
                    <span class="modify_quest">Modifier la quête</span>
                    <span class="delete_quest">Supprimer la quête</span>
                `;
                document.querySelector(".quests_list").appendChild(newQuest);
            })
            .catch( console.log("Erreur lors de la création de la quête"))
    }
    const addNewUniverse = (e) => {
        e.preventDefault();
        let universeItem = {name: document.getElementById("universe_title").value};

        createUniverse(universeItem);
    }

    return (    
        <>
            <div className="quest_manager">
                <div className="add_button_container add_universe_container" onClick={openUniverseWindow}>
                    <i>Ajouter un univers</i>
                    <span className='add'>+</span>
                </div>
                <div className="add_window add_universe_window">
                    <form>
                        <input type="text" className='name universe_name' id='universe_title' name='title' placeholder="Nom d'univers" />
                        <input className='submit_button submit_universe' type="submit" value='Ajouter univers' onClick={addNewUniverse} />
                    </form>
                </div>
                <div className="add_button_container add_quest_container" onClick={openQuestWindow}>
                    <i>Ajouter une quête</i>
                    <span className='add'>+</span>
                </div>
                <div className="add_window add_quest_window">
                    <form>
                        <input type="text" className='name quest_name' id='quest_title' name='title' placeholder='Nom de quête' />
                        <input className='submit_button submit_quest' type="submit" value='Ajouter quête' onClick={addNewQuest} />
                    </form>
                </div>
            </div>
        </>
    )
}
