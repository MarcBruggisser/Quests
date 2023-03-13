import React from 'react';
import axios from 'axios';

export default function QuestManager() {

    // const openQuestWindow = () => { document.querySelector(".add_quest_window").classList.toggle("open"); }
    const openQuestWindow = () => {
        document.querySelector(".add_quest_window").classList.toggle("open");
    }
    const addNewQuest = (e) => {
        e.preventDefault();
        let questName = document.getElementById("title").value;

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

    return (
        <>
            <div className="quest_manager">
                <div className="add_quest_container" onClick={openQuestWindow}>
                    <i>Ajouter une quête</i>
                    <span className='add_quest'>+</span>
                </div>
                <div className="add_quest_window">
                    <form>
                        <input type="text" className='quest_name' id='title' name='title' placeholder='Nom de quête' />
                        <input className='submit_quest' type="submit" value='Ajouter quête' onClick={addNewQuest} />
                    </form>
                </div>
            </div>
        </>
    )
}
