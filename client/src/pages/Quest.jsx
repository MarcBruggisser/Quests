import React, { useState, useEffect } from 'react'
import Header from '../composants/Header/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Quest() {

  let idQuest = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [infosQuest, setInfosQuest] = useState();


  useEffect(() => {

    axios.get(`http://localhost:3000/api/quests/${idQuest}`)
      .then( (response) => { setInfosQuest(response.data); setIsLoading(false); })

  }, [isLoading]);


  if(isLoading) return <div>Loading</div>

  return (
    <>
      <Header />

      <section className="quest_section">
        <div className="infos">
          <h1>{infosQuest.name}</h1>
          <p>{infosQuest.description}</p>
        </div>
        <div className="actions">
          <span className='add_quest'>+ Ajoutez une sous-quête</span>
          <span className='add_quest'>+ Ajoutez une étiquette</span>
        </div>
      </section>
    </>
  )
}
