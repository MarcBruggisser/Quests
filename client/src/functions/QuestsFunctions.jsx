// A importer dans ce fichier : API calls
import React, {useState} from 'react'
import axios from "axios"

export default function Questfunctions() {
  return (
    <div>Functions</div>
  )
}

const createQuestApi = (newQuest) => {
  axios.post(`http://localhost:3000/api/quests`, newQuest)
    .then( () => console.log("Sous-quête crée") )
}

function getAllQuestsApi(isLoading, allQuests, allUniverses) {
  

  axios.get("http://localhost:3000/api/quests")
    .then( res => {

      setAllQuests(res.data);
      let universesList = [];
      
      allQuests.forEach( quest => {

        // Create list of all universes
        if( !universesList.includes(quest.universe) )
          universesList.push(quest.universe);
      })

      setAllUniverses(universesList); setIsLoading(false);  
      return 
    })
}
const modifyQuestApi = (idQuest, questChanger) => {
  axios.put(`http://localhost:3000/api/quests/${idQuest}`, questChanger)
    .then( () => console.log("Quête mise à jour") )
}

// Function with API call PUT to modify the subquest
const modifySubquestApi = (questChanger) => {
  axios.put(`http://localhost:3000/api/quests/${questChanger.subquestId}`, questChanger)
    .then( () => console.log("Sous-quête mise à jour") )
}

function deleteQuestApi(dataQuete) {
  axios.delete(`http://localhost:3000/api/quests/${dataQuete}`)
      .then( () => { console.log("Quête supprimée"); })
      .catch( ( console.log("Erreur")) )
}



export { createQuestApi, deleteQuestApi, getAllQuestsApi, modifyQuestApi, modifySubquestApi };