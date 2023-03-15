import { useState, useEffect } from 'react';
import QuestCard from '../QuestCard/QuestCard';

export default function Univers( props ) {

    let universeName = props.name;
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
    
    return (
        <div className="univers">
            <h2>{props.name}</h2>
            <ul className='quests_list'>
                {
                    allUniverseQuests.map( (quest) => <QuestCard key={quest._id} name={quest.name} description={quest.description} idQuest={quest._id} project={quest.project} /> )
                }
            </ul>
        </div>
    )
}
