import React from 'react';
import {Link } from "react-router-dom";

function EventsTable(props) {
    const events = props.events;
    return (
        <div className="m-3 p-3 overflow-scroll shadow rounded" style={props.style}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Spelade serier</th>
                        <th scope="col">Pågående</th>
                    </tr>
                </thead>
                <tbody className='overflow-scroll'>
                    {events.map((event)=>{
                        return(
                            <tr key={event.id}>
                                <td><Link to={`/events/${event.id}`} className="text-decoration-none">{event.title}</Link></td>
                                <td>{event.playCount}</td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                    className={`bi bi-circle-fill ${event.active ? 'text-success' : 'text-danger'}`}
                                    viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8"/>
                                    </svg>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
  
export default EventsTable;

