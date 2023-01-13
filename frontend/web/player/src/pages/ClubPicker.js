import React, { useState, useEffect} from 'react';

import Select from 'react-select' 
import { getClubs } from '../util/server/clubs';

export default function ClubPicker({onChange = () => {}}) {
    const [clubs, setClubs] = useState([]);

    const [items, setItems] = useState([]);

    useEffect(() => {
        getClubs().then((clubs) => {
            setClubs(clubs);
            setItems(clubsToItems(clubs));
        })
        .catch((err) =>{})
    }, [])

    return (
        <Select 
            options={items} className='mb-4'
            isClearable={false}
            isSearchable={true}
            placeholder='Välj förening'
            onChange={(e) => {
                onChange(clubs[e.value])
            }}
        />
    );
}

function clubsToItems(clubs){
    var items = [];
    clubs.forEach((club)=>{
        items.push({label: club.name, value: items.length})
    })
    return items;
}
