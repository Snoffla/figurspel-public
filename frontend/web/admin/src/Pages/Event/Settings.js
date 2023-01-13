import React , {useState, useEffect} from 'react';

import ClubsTable from '../../Components/ClubsSettingsTable';

import {useInput} from '../../utilities/useInput';
import {getSettings, setSettings} from '../../utilities/server/events';



function Settings(props){
    const eventId = props.eventId;

    const { value:name, bind:bindName, reset:resetName, setValue:setName} = useInput('');
    const { value:code, bind:bindCode, reset:resetCode, setValue:setCode} = useInput('');
    const [active, setActive] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        setSaving(true);
        const settings = {title: name, code: code, active: active};
        setSettings(eventId, settings).then(()=>{
            setSaving(false);
        }).catch((err) => {
            setSaving(false);
        });
    }

    function onActiveChange(){
        setActive(!active);
    }

    useEffect(() => {
        async function fetchSettings(){
            try {
                var settings = (await getSettings(eventId))[0];
                setActive(settings.active);
                setName(settings.title);
                setCode(settings.code);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        const unsubscribe = fetchSettings();
        return unsubscribe;
    }, []);
    



    return(
        <>
        <div className='card p-3 m-3'>
            <h5 className="card-title">Allmänt</h5>
            {loading && <span className='text-muted'>Hämtar...</span>}
            {!loading &&
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Namn</label>
                        <input type="text" className="form-control" id="nameInput" {...bindName}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="codeInput" className="form-label">Lösenord</label>
                        <input type="text" className="form-control" id="codeInput" {...bindCode} 
                        style={{}}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-check-label me-2" htmlFor="activeInput">Pågående: </label>
                        <input className="form-check-input" type="checkbox" id="activeInput" checked={active} onChange={onActiveChange}/>
                    </div>
                
                    {saving
                        ? <span className='text-muted'>Sparar...</span>
                        : <button type="submit" className="btn btn-primary mx-auto d-block" >Spara</button>
                    }
                </form>
            }
        </div>
        <div className='card p-3 m-3'>
            <h5 className="card-title">Deltagande klubbar</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <ClubsTable style={{maxHeight: 400}} eventId={eventId}></ClubsTable>
                </div>
            </form>
        </div>
        </>
    );
}

export default Settings;



