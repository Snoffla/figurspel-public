import React , {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

import EventScoresCount from '../../Components/EventScoresCount';
import ScoresTable from '../../Components/ScoresTable';


function Overview(props){

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <EventScoresCount eventId={props.eventId}/>
                </div>
                <ScoresTable eventId={props.eventId}></ScoresTable>
            </div>
        </div>
    );
}

export default Overview;



