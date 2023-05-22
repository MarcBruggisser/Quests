// A importer dans ce fichier : API calls
import React, {useState} from 'react'
import axios from 'axios';

export default function UniversesFunctions() {
  return (
    <div>UniversesFunctions</div>
  )
}

const createUniverse = (universeItem) => {
  axios.post("http://localhost:3000/api/universes", universeItem)
    .then( () => console.log("Univers créé") )
    .catch( console.log("Erreur lors de la création de l'univers"))
}

// Ne fonction pas pour l'instant
const getAllUniversesApi = () => {
  let allUniverses;

  axios.get(`http://localhost:3000/api/universes`)
    .then( (response) => {
      allUniverses = response.data;
      console.log(allUniverses);
      return allUniverses
    })
}

const modifyUniverse = (universeItem) => {
  axios.put("http://localhost:3000/api/universes", universeItem)
    .then( () => console.log("Univers modifié") )
    .catch( console.log("Erreur lors de la modification de l'univers"))
}

const deleteUniverse = (universeItem) => {
  axios.delete("http://localhost:3000/api/universes", universeItem)
    .then( () => console.log("Univers supprimé") )
    .catch( console.log("Erreur lors de la supression de l'univers"))
}

export { createUniverse, getAllUniversesApi, modifyUniverse, deleteUniverse }