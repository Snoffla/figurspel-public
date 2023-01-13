import React , {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

import Sidebar  from '../../Components/Sidebar';
import NavBar  from '../../Components/EventNavBar';
import Header  from '../../Components/Header';

import Overview  from './Overview';
import Settings  from './Settings';
import Export  from './Export';
import Clubs  from './Clubs';
import {getSettings} from '../../utilities/server/events'

function Event() {
    let params = useParams();
    let id = params.id;
    let page = params.page;
    const [event, setEvent] = useState({title: "Event"});
    const [error, setError] = useState(null);

    useEffect(() => {
        getSettings(id).then((event) =>{
            setEvent(event[0]);
        }).catch((err) =>{
            setError(err);
        });
    }, [])

    return (
        <>
            <Sidebar page='event' />
            <div className='d-flex flex-fill flex-column overflow-scroll' style={{maxWidth: 1200}}>
                <Header title={event.title}></Header>
                <NavBar/>
                <div className='p-2 flex-fill'>
                    {((page === 'overview') || !page) && <Overview eventId={id}></Overview>}
                    {page === 'clubs' && <Clubs eventId={id}></Clubs>}
                    {page === 'settings' && <Settings eventId={id}></Settings>}
                    {page === 'export' && <Export eventId={id}></Export>}
                </div>
            </div>
        </>
    );
  }
  
  export default Event;