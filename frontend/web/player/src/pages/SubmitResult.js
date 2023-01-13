import React, { useState} from 'react';

import { getEventClub } from '../util/server/events';
import { createScore } from '../util/server/scores';

import ClassPicker from './ClassPicker';

export default function SubmitResult({onSubmit, player, event}) {
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);

    const [score, setScore] = useState(null);
    const [gameType, setGameType] = useState(0);
    const [playerClass, setPlayerClass] = useState(null);

    useState(() => {
        getEventClub(event.id, player.clubId).then((club) => {
            setClub(club);
            setLoading(false);
        }).catch(err => {});
    }, [])

    function submitResult(){
        setSaving(true);
        createScore(event.id, event.code, gameType, player.id, score, playerClass)
        .then((data) => {
            setSaving(false);
            onSubmit();
        })
        .catch((err) => {
            setSaving(false);
        })
    }

    function onClassChange(playerClass){
        setPlayerClass(playerClass);
    }
   
    return (
        <div className='form text-center'>
            {(!club.enabled && !loading && !saving) && 
            <>
                <p>Din förening deltar tyvärr inte i denna tävling.</p>
                <a href='.' className='text-center d-block'>Försök igen</a>
            </>
            }
            {(club.enabled == true && !saving) &&
            <>
                <h3>{event.title}</h3>

                <h3>{player.name}</h3>
                <p >{club.name}</p>

                <div className="btn-group btn-group-lg mb-3 w-100" role="group" onChange={(e) => setGameType(parseInt(e.target.value))}>
                    <input value={0} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"/>
                    <label className="btn btn-outline-primary game-type-btn" htmlFor="btnradio1">Klassisk</label>

                    <input value={1} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
                    <label className="btn btn-outline-primary game-type-btn" htmlFor="btnradio2">Modern</label>

                    <input value={2} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
                    <label className="btn btn-outline-primary game-type-btn" htmlFor="btnradio3">Kids</label>
                </div>
                <div className="form-floating mb-3">
                        <input type="number" className="form-control form-control-lg" id="scoreInput" onChange={(e) => setScore(e.target.value)} min='1'/>
                        <label htmlFor="scoreInput">Resultat</label>       
                </div>

                <div className="mb-3 text-left justify-content-start">
                    <ClassPicker onChange={onClassChange}/>
                </div>

                <div className="checkbox mb-3 text-center">
                    <label>
                        <input type="checkbox" className='me-2' required onChange={(e) => setTermsAccepted(e.target.checked)}/>
                        <span>Jag godkänner <a href='https://figur.snoffla.com/policy' target="_blank">villkoren</a></span>
                    </label>
                </div>

                <button onClick={submitResult} className="btn btn-lg btn-primary d-block m-auto" 
                disabled={!termsAccepted || (!isNumber(score) || score <= 0) || !playerClass}>
                    <span>Rapportera</span>
                </button>

            </>
            }
            {saving &&
                <span>Sparar...</span>
            }

        </div>
    );
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 