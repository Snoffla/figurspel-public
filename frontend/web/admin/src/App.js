import React, {}from 'react';
import './App.css';

import EventsPage   from './Pages/Events';
import EventPage   from './Pages/Event/';
import CreatePage   from './Pages/CreateEvent';
import HomePage   from './Pages/Home';
import LoginPage   from './Pages/Login';

import {Switch, Route, useHistory} from "react-router-dom";

import { auth } from "./firebase";

function App() {
  const history = useHistory();

  auth().onAuthStateChanged(function(user) {
    if (!user){
      history.replace('/login');
    }
  });
  

  return (
    <div className="App">
      <main style={{display: 'flex', height: '100vh'}} className='bg-light'>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route exact path="/events">
            <EventsPage></EventsPage>
          </Route>
          <Route exact path='/events/:id'>
            <EventPage></EventPage>
          </Route>
          <Route exact path='/events/:id/:page'>
            <EventPage></EventPage>
          </Route>
          <Route exact path='/create-event'>
            <CreatePage></CreatePage>
          </Route>
          <Route exact path='/login'>
            <LoginPage></LoginPage>
          </Route>
        </Switch>
        
      </main>
    </div>
  );
}

export default App;
