import React, {useEffect, useState} from 'react';
import {getScores, deleteScore, deleteScores} from '../utilities/server/scores';

import ClubPicker from '../Components/ClubPicker';
import Select from 'react-select'

const COUNT = 25;

const gameTypes = [
    {value: 'all', label: 'Alla'},
    {value: 'classic', label: 'Klassisk'},
    {value: 'modern', label: 'Modern'},
    {value: 'kids', label: 'Kids'}
]

function ScoresTable(props) {
    const eventId = props.eventId;
    const [scores, setScores] = useState([]);

    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const [gameType, setGameType] = useState('all');
    const [clubId, setClubId] = useState('');

    const [load, setLoad] = useState(false);

    const settings = {
        eventId: eventId,
        count: COUNT,
        offset: offset,
        gameType: gameType,
        clubId: clubId
    }

    useEffect(()=> {
        getScores(settings).then((data)=> {
            for(const i in data.data){
                data.data[i].time = formatDate(data.data[i].time);
            }
            setScores(data.data);
            setTotalCount(parseInt(data.totalCount));
        })
        .catch((err)=>{
            console.log(err);
        });
    }, [offset, gameType, clubId, load])

    function next(){
        if(totalCount > offset + COUNT){
            setOffset(offset + COUNT);
        }
    }
    function previous(){
        if(offset-COUNT < 0){
            setOffset(0);
        }else{
            setOffset(offset-COUNT);
        }
    }

    function reload(){
        setLoad(!load);
    }

    function onDeleteScore(scoreId){
        var ok = window.confirm('Vill du verkligen ta bort resultatet? (Går ej att ångra)')
        if (ok){
            deleteScores(eventId, scoreId).then(()=>{
                reload();
            }).catch(()=>{
                
            })
        }
    }
    
    return (
        <div className="m-3 p-3 overflow-scroll shadow rounded" style={props.style}>
            <div className="mb-3">
                <label className="form-label">Klubb</label>
                <ClubPicker style={{width: 300}} onChange={setClubId}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Typ av figur</label>
                <Select options={gameTypes} defaultValue={{value: 'all', label: 'Alla'}} onChange={(e) =>setGameType(e.value)}/>
            </div>
            
            <nav style={{display: 'inline-block', margin: 10}}>
                <ul className="pagination">
                    <li className={`page-item ${(offset == 0) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={previous}>
                            <span aria-hidden="true">&laquo; Föregående</span>
                        </a>
                    </li>
                    <li className={`page-item ${(offset + COUNT >= totalCount) ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={next}>
                            <span aria-hidden="true">Nästa &raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <p style={{display: 'inline-block'}}>Visar resultat {offset+1} - {Math.min(offset + COUNT, totalCount)} av {totalCount}</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Tid</th>
                        <th scope="col">Namn</th>
                        <th scope="col">Klubb</th>
                        <th scope="col">Poäng</th>
                        <th scope="col">Typ</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className='overflow-scroll'>
                {
                    
                    scores.map((score, index) => {
                        return (
                            <tr key={score.id}>
                                <td>{score.time}</td>
                                <td>{score.name}</td>
                                <td>{score.club}</td>
                                <td>{score.score}</td>
                                <td>{score.gameType}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>{onDeleteScore(score.id)}}>Radera</button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

function formatDate(startDate){
    const date = new Date(startDate);
    const dateString = `${
        date.getHours().toString().padStart(2, '0')}:${
        date.getMinutes().toString().padStart(2, '0')} \xa0 \xa0${
        date.getDate().toString().padStart(2, '0')}-${
        (date.getMonth() + 1).toString().padStart(2, '0')}-${
        date.getFullYear()}`;
    return dateString;
}
  
export default ScoresTable;

