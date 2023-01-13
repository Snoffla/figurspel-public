import React , { useState }from 'react';

import Select from 'react-select' 

import { ChevronForwardOutline } from 'react-ionicons'

import { getEventsByPassword } from '../util/server/events';

function Home({onSubmit}) {
    const [code, setCode] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [eventIndex, setEventIndex] = useState(null);
    const [items, setItems] = useState([]);
  
    function codeChanged(event){
        setCode(event.target.value);
    }

    function submitCode(){
        setLoading(true);
        setError('');
        getEventsByPassword(code).then((data) => {
            setLoading(false);
            if (data.length == 0){
                setError('Tävling hittades inte');
            }
            else if (data.length == 1){
                submitEvent( null,data[0]);
            }
            else {
                console.log(data);
                setEvents(data);
                setItems(eventsToItems(data));
            }
        }).catch((err) =>{});
    }

    function onKeyUp(e){
        if (e.keyCode === 13) {
            submitCode();
        }
    }

    function submitEvent(e, event = events[eventIndex]){
        if (!event){return}
        event.code = code;
        onSubmit(event)
    }
    return (
        <div className='form'>
            {events.length < 1 
            ?
            <>
                <div className="mb-3">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="codeInput" onChange={codeChanged} onKeyUp={onKeyUp}/>
                        <label htmlFor="codeInput">Kod</label>

                        <div className="form-feedback error">
                            {error}
                        </div>
                            
                    </div>
                </div>
                {loading ?
                    <div className="form-feedback text-center">
                        Hämtar...
                    </div> 
                    :
                    <button onClick={submitCode} className="btn btn-lg btn-primary d-block m-auto">
                        <span>Fortsätt  </span>
                        <ChevronForwardOutline color={'#fff'} height="25px" width="25px" />
                    </button>
                }
            </>
            :
            <>
                <Select 
                    options={eventsToItems(events)} className='mb-4'
                    isClearable={false}
                    isSearchable={true}
                    placeholder={'Välj tävling'}
                    onChange={(e) => {setEventIndex(e.value)}}
                />
                <button onClick={submitEvent} className="btn btn-lg btn-primary d-block m-auto">
                    <span>Fortsätt  </span>
                    <ChevronForwardOutline color={'#fff'} height="25px" width="25px" />
                </button>  
            </>
            }
        </div>
    );
  }
  
export default Home;

function eventsToItems(events){
    var items = [];
    events.forEach((event)=>{
        items.push({label: event.title, value: items.length})
    })
    return items;
}