import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Quest() {

  let idQuest = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [infosQuest, setInfosQuest] = useState();
  const [allUniverses, setAllUniverses] = useState();


  useEffect(() => {

    axios.get(`http://localhost:3000/api/quests/${idQuest}`)
      .then( (response) => { setInfosQuest(response.data); })
    axios.get(`http://localhost:3000/api/universes`)
      .then( (response) => {
        setAllUniverses(response.data);
        setIsLoading(false);
      })      

  }, [isLoading]);

  
  const openUniverseChangeWindow = () => {
    document.querySelector(".universe_choice").classList.toggle("open");
  }
  const changeUniverse = (e) => {
    let newUniverse = e.target.textContent;
    axios.put(`http://localhost:3000/api/quests/${idQuest}`, newUniverse);
    // document.querySelector(".universe_choice").classList.remove("open");
  }

  if(isLoading) return <div>Loading</div>

  return (
    <>

      <section className="quest_section">
        <div className="infos" data-universe={infosQuest.universe}>
          <h1>{infosQuest.name}</h1>
          <p>{infosQuest.description}</p>
        </div>
        <div className="actions">
          <span className='add_button add_universe' onClick={openUniverseChangeWindow}>Univers : {infosQuest.universe}</span>
          <ul className="universe_choice">
          { allUniverses.map( universe => <li key={universe._id} onClick={changeUniverse}>{universe.name}</li>) }
          </ul>
          <span className='add_button add_quest'>+ Ajoutez une sous-quête</span>
        </div>
      </section>
    </>
  )
}
