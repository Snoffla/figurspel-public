import React, { useState} from 'react';

import DatePicker from './DatePicker';
import ClubPicker from './ClubPicker';
import { ChevronForwardOutline } from 'react-ionicons'
import { createPlayer } from '../util/server/players';

export default function CreatePlayer({onSubmit, email, code}) {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [club, setClub] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    function onNameChange(e){
        setName(e.target.value);
    }
    function onBirthDateChanged(date){
        setBirthDate(date);
    }

    function onClubChanged(club){
        setClub(club);
    }

    function submitPlayer(){
        if(validateName(name) && birthDate && club){
            var dateString = birthDate.getFullYear() + "-" +(birthDate.getMonth() + 1) + "-" + birthDate.getDate();
            const player = {
                email: email,
                name: name,
                birthDate: dateString,
                clubId: club.id
            }
            setSaving(true);
            createPlayer(player, code).then((data) => {
                if (!data.id){
                    setError('Kunde inte skapa spelare');
                    return;
                }
                player.id = data.id;
                onSubmit(player);
            }).catch((error) => {
                setError('Kunde inte skapa spelare');
            })
        }else{
            return;
        }
    }
   
    return (
        <div className='form'>
            <div className="mb-3">
                <span htmlFor="codeInput" className='input-label'>Namn</span>
                <input type="text" className="form-control" id="codeInput" onChange={onNameChange}/>
                
                {!validateName(name) &&
                    <div className="form-feedback error">
                    Ange namn
                    </div>
                }
            </div>

            <div className="mb-3">
                <span className='input-label'>Födelsedatum</span>
                <DatePicker onChange={onBirthDateChanged}/>
            </div>

            <div className="mb-3">
                <span className='input-label'>Förening</span>
                <ClubPicker onChange={onClubChanged}/>
            </div>

            <button onClick={submitPlayer} className="btn btn-lg btn-primary d-block m-auto">
                <span>Fortsätt  </span>
                <ChevronForwardOutline color={'#fff'} height="25px" width="25px" />
            </button>
        </div>
    );
}

const validateName = (name) => {
    const expression = /(\S+)\s(\S+)/;
    return expression.test(String(name).toLowerCase())
}