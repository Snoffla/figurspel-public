import React , {useState, useEffect} from 'react';
import {Link } from "react-router-dom";

import Sidebar  from '../Components/Sidebar';
import EventsTable  from '../Components/EventsTable';
import Header  from '../Components/Header';
import Bar  from '../Components/Bar';

import {getEvents} from '../utilities/server/events'

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const unsubscribe= getEvents()
        .then(event =>{
            setEvents(event);
        }).catch(err =>{
            console.log(err);
        });

        return unsubscribe;
    }, []);


    return (
        <>
            <Sidebar page='events' />
            <div className='d-flex flex-fill flex-column overflow-scroll bg-light' style={{maxWidth: 1000, padding: 0}}>
                <Header title='Event'></Header>
                <Bar>
                    <Link to='/create-event' className="ms-auto">
                        <button type="button" className="btn btn-outline-primary btn-sm ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle me-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            Nytt Event
                        </button>
                    </Link>
                </Bar>
                <div className='p-2 flex-fill'>
                    <EventsTable style={{maxHeight: 500}} events={events}></EventsTable>
                </div>
            </div>
        </>
    );
  }
  
  export default Events;