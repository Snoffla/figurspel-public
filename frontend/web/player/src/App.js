import React, { useState } from 'react';
import './App.css';

import EventPicker from './pages/EventPicker'
import EmailInput from './pages/EmailInput'
import CreatePlayer from './pages/CreatePlayer';
import SubmitResult from './pages/SubmitResult';
import Finish from './pages/Finish';


function App() {
  const [player, setPlayer] = useState({});
  const [event, setEvent] = useState({});

  const [page, setPage] = useState('event-picker');

  function onEventPicked(event){
    setEvent(event);
    setPage('email-input');
  }

  function onEmailInput(player){
    setPlayer(player);
    if (player.id){
        setPage('submit-result');
    }else{
        setPage('create-player');
    }
  }

  function onPlayerCreated(player){
    setPlayer(player);
    setPage('submit-result');
  }

  function onResultSubmit(){
    setPage('finish');
  }

  return (
    <div className="App">
      <main className='flex align-items-center justify-content-center flex-column'>
        <h1 className='text-center mb-5 mt-4'>Resultatrapportering</h1>
        {page === 'event-picker' &&
          <EventPicker onSubmit={onEventPicked}/>
        }
        {page === 'email-input' &&
          <EmailInput onSubmit={onEmailInput}/>
        }
        {page === 'create-player' &&
          <CreatePlayer onSubmit={onPlayerCreated} code={event.code} email={player.email}/>
        }
        {page === 'submit-result' &&
          <SubmitResult onSubmit={onResultSubmit} event={event} player={player}/>
        }
        {page === 'finish' &&
          <Finish/>
        }
      </main>
    </div>
  );
}

export default App;
