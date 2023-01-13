import React , {useState, useEffect} from 'react';

import Select from 'react-select'

const types = [
    { value: 'standard', label: 'Standard' },
    { value: 'hundred', label: 'Hundra'},
    { value: 'club_count', label: 'Klubb - Spelade serier'},
    { value: 'country_count', label: 'Land - Spelade serier'},
    { value: 'country_sum', label: 'Land - Total summa'},
]

const gameTypes = [
    {value: 'classic', label: 'Klassisk'},
    {value: 'modern', label: 'Modern'},
    {value: 'kids', label: 'Kids'}
]

const classTypes = [
    {value: 'all', label: 'Alla'},
    {value: 'm', label: 'Herr'},
    {value: 'w', label: 'Dam'},
    {value: 'r', label: 'Rullstol'},
    {value: 'j', label: 'Junior'}
]


function Export(props){
    const [title, setTitle] = useState('');
    const [type, setType] = useState(types[0]);
    const [gameType, setGameType] = useState(gameTypes[0]);
    const [count, setCount] = useState(5);
    const [playerClass, setPlayerClass] = useState(classTypes[0])

    const [frameHeight, setFrameHeight] = useState(0); 

    var url = `https://framescoreboardfigur.snoffla.com/?event_id=${
        props.eventId}&type=${
        type.value}&title=${
        title}&game_type=${
        gameType.value}&count=${
        count}&class=${
        playerClass.value}`

    const onTitleChange = (e) =>{
        setTitle(e.target.value);
    }
    const onCountChange = (e) =>{
        setCount(parseInt(e.target.value));
    }

    useEffect(() => {
        var height = 50;
        if (title != ''){
            height+= 30;
        }
        height += count*41;
        setFrameHeight(height);
    },[count, title])

    return(
        <div className='card p-3 m-3'>
            <h5 className="card-title">Iframe för topplista</h5>
            <div className="mb-3">
                <label className="form-label">Titel</label>
                <input type="text" className="form-control" onChange={onTitleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Antal</label>
                <input type="number" min='1' className="form-control" onChange={onCountChange} defaultValue={count} />
            </div>
            <div className="mb-3">
                <label className="form-label">Typ av topplista</label>
                <Select options={types} defaultValue={type} placeholder='Välj...' onChange={setType}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Typ av figur</label>
                <Select options={gameTypes} defaultValue={gameType} placeholder='Välj...' onChange={setGameType}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Klass</label>
                <Select options={classTypes} defaultValue={playerClass} placeholder='Välj...' onChange={setPlayerClass}/>
            </div>
            
            <code>{`<iframe src="${url}" style="border:none;width:100%;height:${frameHeight}px"/>`}</code>
            <iframe src={url} height={frameHeight}/>
        </div>
    );
}

export default Export;



