import React, { useState, useEffect} from 'react';

import {getAllClubs, getEventClubs} from '../utilities/server/clubs'

import ClubsSettingsRow from './ClubSettingsRow';

function ClubsSettingsTable(props) {

    const [clubs, setClubs] = useState([]);
    const [update, setUpdate] = useState(true);
    const eventId = props.eventId;

    function forceUpdate(){
        setUpdate(!update);
    }

    useEffect(() => {
        const unsubscribe = fetchClubs();
        return unsubscribe;
    }, []);

    async function fetchClubs(){
        try {
            var clubs = await getAllClubs();
            var activeClubs = await getEventClubs(eventId);

            var newClubs = [];

            
            clubs.forEach((club) =>{
                if(activeClubs.some((element) => element.id === club.id)){
                    club.active = true;
                } else{
                    club.active = false;
                }
                newClubs.push(club);
            })
            setClubs(newClubs);
        } catch (error) {
            console.log(error);
        }
        
    }

    function handleChange (id){
        var newClubs = clubs;
        newClubs[id].active = !clubs[id].active;
        newClubs[1].updating = true;
        setClubs(newClubs);
        forceUpdate();
    }

    return (
        <div className="m-3 p-3 overflow-scroll rounded" style={props.style}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" style={{width: '60%'}}>Klubb</th>
                        <th scope="col">Deltar</th>
                    </tr>
                </thead>
                <tbody className='overflow-scroll'>
                    {clubs.map((club)=>{
                        return(
                           <ClubsSettingsRow club={club} eventId={eventId} key={club.id}></ClubsSettingsRow>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
  
export default ClubsSettingsTable;

