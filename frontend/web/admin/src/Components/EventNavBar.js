import React from 'react';
import {Link, useParams} from "react-router-dom";

import Bar from './Bar';

function NavBar(props) {
  let params = useParams();
  let currentPage = params.page;
  let eventId = params.id; 
  const pages = [
    {
      title: 'Översikt',
      name: 'overview'
    },
    {
      title: 'Klubbar',
      name: 'clubs',
    },
    {
      title: 'Inställningar',
      name: 'settings'
    },
    {
      title: 'Export',
      name: 'export'
    }
  ];

  return (
    <Bar>
      {pages.map((page, index) => {
        return(
          <li className="nav-item" key={index}>
            <Link to={`/events/${eventId}/${page.name}`} className={`nav-link px-3 ${page.name === currentPage ? 'active' : ''}`} style={{cursor: 'pointer'}} >{page.title}</Link>
          </li>
        )
      })}
    </Bar>
  );
  }
  
  export default NavBar;


