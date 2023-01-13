import React, {useState} from 'react';

import Sidebar  from '../Components/Sidebar';
import Header  from '../Components/Header';
import Bar  from '../Components/Bar';

import {createEvent} from '../utilities/server/events'

import { useHistory } from "react-router-dom";

function CreateEvent() {
    const history = useHistory();
    const [title, setTitle] = useState('');

    function onTitleChange(e){
        setTitle(e.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if (!title){return};

        createEvent(title)
        .then(event =>{
            history.replace('/events/'+event.id)
        }).catch(err =>{

        });
        
        
    }

    return (
        <>
            <Sidebar page='' />
            <div className='d-flex flex-fill flex-column overflow-scroll' style={{maxWidth: 1000}}>
                <Header title='Nytt Event'></Header>
                <div className='p-2 flex-fill'>
                    <form onSubmit={handleSubmit} className='m-3 p-3 shadow rounded'>
                        <div className="mb-3">
                            <label className="form-label">Namn</label>
                            <input type="text" className="form-control" id="titleInput" onChange={onTitleChange}/>
                            
                        </div>
                        <button type="submit" className="btn btn-primary mx-auto d-block">Skapa</button>
                    </form>
                </div>
            </div>
        </>
    );
  }
  
  export default CreateEvent;