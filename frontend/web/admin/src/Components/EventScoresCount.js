import React, {useState, useEffect} from 'react';

import {getScoreCountForEvent} from '../utilities/server/events';
import DataLabel from './SimpleDataLabel';

function EventScoresCount(props) {
    const eventId = props.eventId;
    const [count, setCount] = useState('');

    useEffect(() => {
        const unsubscribe = getScoreCountForEvent(eventId).then((data) => {
            setCount(data);
        })
        return unsubscribe;
    }, []);
    return (
        <DataLabel title='Spelade serier' text={count} />
    );
}
  
export default EventScoresCount;

