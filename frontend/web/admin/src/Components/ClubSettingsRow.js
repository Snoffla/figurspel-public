import React, { useState, useEffect} from 'react';

import {enableClub, disableClub} from '../utilities/server/clubs'

function ClubsSettingsRow(props) {

    const eventId = props.eventId;
    const [club, setClub] = useState(props.club);

    const [update, setUpdate] = useState(true);

    function forceUpdate(){
        setUpdate(!update);
    }

    async function handleChange (){
        var newClub = JSON.parse(JSON.stringify(club));

        newClub.active = !club.active;
        newClub.updating = true;
        setClub(newClub);
        var res;
        try {
            if(newClub.active){
                res = await enableClub(eventId, club.id);
            }else{
                res = await disableClub(eventId, club.id);
            }
        } catch (error) {
            console.log(error);
            newClub.active = club.active;
        }
        newClub.updating = false;
        setClub(newClub);
        forceUpdate();
    }

    return (
    <tr key={club.id}>
        <td>{club.name}</td>
        <td>
            <input className="form-check-input me-3" type="checkbox" id="activeInput" checked={club.active} onChange={handleChange}/>
            {club.updating && <span className='text-muted'>Uppdaterar...</span>}
        </td>
    </tr>
    );
}
  
export default ClubsSettingsRow;

