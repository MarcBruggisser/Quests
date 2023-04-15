import { useState, useEffect } from 'react';
import QuestCard from '../QuestCard/QuestCard';

export default function Univers( props ) {

    const universeName = props.name;
    const allQuests = props.allQuests;
    const [allUniverseQuests, setAllUniverseQuests] = useState([]);
    let universeQuests = [];

    useEffect( () => {
        allQuests.forEach( (quest) => {
            if( universeName === quest.universe )
                if( !universeQuests.includes( quest ) )
                    universeQuests.push(quest) 
        })
        setAllUniverseQuests(universeQuests);
    }, [])

    const toggleUniverse = (e) => {
        e.target.closest(".universe").classList.toggle("open");
    }
    
    return (
        <div className="universe">
            <h2 onClick={toggleUniverse}><span>{universeName}</span></h2>
            <ul className='quests_list'>
                {
                    allUniverseQuests.map( (quest) => <QuestCard key={quest._id} name={quest.name} description={quest.description} idQuest={quest._id} project={quest.project} /> )
                }
            </ul>
        </div>
    )
}
