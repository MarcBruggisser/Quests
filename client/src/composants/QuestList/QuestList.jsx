import {useState, useEffect} from "react"
import axios from "axios"
import Universe from "../Universe/Universe"

export default function QuestList() {

  const [isLoading, setIsLoading] = useState(true);
  const [allQuests, setAllQuests] = useState([]);
  const [allUniverses, setAllUniverses] = useState([]);
  
  useEffect( () => {
    axios.get("http://localhost:3000/api/quests")
    .then( res => {

      setAllQuests(res.data);
      let universesList = [];
      
      allQuests.forEach( quest => {

        // Create list of all universes
        if( !universesList.includes(quest.universe) )
        universesList.push(quest.universe);
      })

      setAllUniverses(universesList);
      setIsLoading(false);      
      })
  }, [isLoading]);

  if (isLoading) return (<div>Loading</div>);

  return (
    <>
      { allUniverses.map( universe => <Universe key={universe} name={universe} allQuests={allQuests} />) }
    </>
  )
}
