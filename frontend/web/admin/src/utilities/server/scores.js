import {auth} from "../../firebase";

import {postData, getData, putData, waitForUser, headData, deleteData} from './db'

async function getScores(settings){
    var url = `https://apifigur.snoffla.com/events/${
        settings.eventId}/scores?count=${
        settings.count}&offset=${
        settings.offset}&game_type=${
        settings.gameType}&club_id=${
        settings.clubId}`
    try {
        await waitForUser();
        const idToken = await auth().currentUser.getIdToken(true);
        const response = await getData(url, {}, idToken);
        const count = response.headers.get('X-Total-Count')
        const data = await response.json();
        return {data: data, totalCount: count};
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deleteScores(eventId, scoreId){
    var url = `https://apifigur.snoffla.com/events/${eventId}/scores/${scoreId}`;
    try {
        await waitForUser();
        const idToken = await auth().currentUser.getIdToken(true);
        const response = await deleteData(url, {}, idToken);
        return response.ok;
    } catch (error) {
        throw Error(error.message);
    }
}


export {getScores, deleteScores};