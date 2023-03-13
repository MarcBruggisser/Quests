import React, {useState, useEffect} from 'react';
import Quest from '../Quest/QuestCard';
import axios from 'axios';

export default function Univers( props ) {

    // const [isLoading, setLoading] = useState(true);
    // const [quests, setQuests] = useState();
    
    // useEffect(() => {
        
    //     axios.get('http://localhost:3000/api/quests')
    //     .then( (res) => { setQuests(res.data); setLoading(false); })

    // }, [isLoading]);


    // if( isLoading ) return <div>Loading</div>

    return (
        <div className="univers">
            {/* <h2>{props.title}</h2> */}
            <ul className='quests_list'>
                {/* { quests.map( (quest) => <Quest key={quest._id} name={quest.name} description={quest.description} idQuest={quest._id} univers={quest.univers} /> )} */}
                {/* { quests.map( (quest) => 
                    <Quest key={quest._id} name={quest.name} description={quest.description} idQuest={quest._id} univers={quest.univers} /> 
                )} */}
            </ul>
        </div>
    )
}
