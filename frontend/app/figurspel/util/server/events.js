import {getData} from "./db";

async function getEventsByPassword(code){
    const url = `https://apifigur.snoffla.com/events?code=${code}&active=1`;
    try {
        const data = await getData(url);
        if (data.error || !data) return ([]);
        return(data);
    } catch (error) {
        return([]);
    }
}

async function getEventClub(eventId, clubId){
    const url = `https://apifigur.snoffla.com/events/${eventId}/clubs/${clubId}`;
    try {
        const data = await getData(url);
        if (data.error || !data) return ({});
        return(data);
    } catch (error) {
        return({});
    }
}

export {getEventsByPassword, getEventClub};