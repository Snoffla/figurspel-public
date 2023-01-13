import React from 'react';
import {Link } from "react-router-dom";

import Sidebar  from '../Components/Sidebar';
import EventsTable  from '../Components/EventsTable';

function Header(props) {
    return (
        <div className='w-100 d-flex justify-content-center' >
            <h2 className="m-3">{props.title}</h2>
        </div>
    );
  }
  
  export default Header;