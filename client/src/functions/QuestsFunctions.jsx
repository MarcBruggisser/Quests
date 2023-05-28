// A importer dans ce fichier : API calls
import React, {useState} from 'react'
import axios from "axios"

export default function Questfunctions() {
  return (
    <div>Functions</div>
  )
}

let dataToBeReturned;
const createQuestApi = (newQuest) => {
  axios.post(`http://localhost:3000/api/quests`, newQuest)
    .then( (res) => { localStorage.setItem("newSubquest", JSON.stringify(res.data) ); })
    .catch( console.log("Erreur lors de la création de la quête"))
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
const modifyQuestApi = (modifyValue) => {
  axios.put(`http://localhost:3000/api/quests/${modifyValue.idQuest}`, modifyValue)
    .then( () => console.log("Quête mise à jour") )
    .catch(err => console.log(err))
}

function deleteQuestApi(dataQuete) {
  axios.delete(`http://localhost:3000/api/quests`, {data : dataQuete})
    .then( () => { console.log("Quête supprimée"); })
    .catch( ( console.log("Erreur")) )
}


// Fonctions
export { createQuestApi, deleteQuestApi, getAllQuestsApi, modifyQuestApi };
// Variables
export {dataToBeReturned}