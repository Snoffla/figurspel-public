import React from 'react';
import {Link } from "react-router-dom";

import Sidebar  from '../Components/Sidebar';
import EventsTable  from '../Components/EventsTable';
import Header  from '../Components/Header';


import { auth } from "../firebase";

function Home() {
    return (
        <>
            <Sidebar page='home' />
            <div className='d-flex flex-fill flex-column overflow-scroll' style={{maxWidth: 1000}}>
                <Header title='Hem'></Header>
                <div className='p-2 flex-fill'>
                    
                </div>
            </div>
        </>
    );
  }
  
  export default Home;