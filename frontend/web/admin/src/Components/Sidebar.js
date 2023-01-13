import React from 'react';
import {Link } from "react-router-dom";

import {auth} from "../firebase";

function Sidebar(props) {
    const page = props.page;
    return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"></svg>
        <span className="fs-4">Figurspel</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <Link to="/" className={`nav-link ${page === "home" ? "active" : "text-white"}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door me-3" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                    </svg>
                    Hem
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/events"className={`nav-link ${page === "events" ? "active" : "text-white"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door me-3" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/> 
                </svg>
                    Event
                </Link>
            </li>
        </ul>

        <button type="button" className="btn btn-outline-primary" onClick={()=> auth().signOut()}>Logga ut</button>
        <hr/>
    </div>
    );
  }
  
  export default Sidebar;