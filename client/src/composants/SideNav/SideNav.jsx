import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function SideNav() {

    const [isLoading, setIsLoading] = useState(true);
    const [allUniverses, setAllUniverses] = useState();

    useEffect(() => {

        axios.get(`http://localhost:3000/api/universes`)
        .then( (response) => {
            setAllUniverses(response.data);
            setIsLoading(false);
        })          
    
      }, [isLoading]);

      if(isLoading) return <div>Loading</div>


    return (
        <aside className='side_nav'>
            <strong>Univers :</strong>
            <ul>
                { allUniverses.map( (universe) => <li key={universe.name}>{universe.name}</li>) }
            </ul>
        </aside>
    )
}
