import {useState, useEffect} from 'react';
import Univers from '../Univers/Univers';
import axios from 'axios';

export default function QuestList() {

  const [isLoading, setIsLoading] = useState(true);
  const [quests, setQuests] = useState([]);
  const [univers, setUnivers] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:3000/api/quests')
      .then( (res) => {
        setIsLoading(false);
        setQuests(res.data);

        if(isLoading === false){
          quests.forEach( (quest) => {
            if( !univers.includes(quest.univers)){ setUnivers(univers.push(quest.univers)); }
          });
          console.log(univers);
        }
      })
  }, [isLoading]);


  return (
    <>
      { univers.map( (univers) => <Univers key={univers} title={univers} quests={universeQuests} /> )}
    </>
  )
}
