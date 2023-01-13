import {postData} from "./db";

async function createScore(eventId, code, gameType, playerId, score, playerClass){
    const url = `https://apifigur.snoffla.com/events/${eventId}/scores`;
    var jsonData = {
        code: code,
        playerId: playerId,
        score: score,
        gameTypeId: (gameType + 1),
        class: playerClass
    }
    try {
        const res = await postData(url, jsonData);
        const data = await res.json();
        if(res.ok && data.id){
            return(data);
        }
        throw res.statusText;
    } catch (error) {
        throw error;
    }
}
export {createScore};