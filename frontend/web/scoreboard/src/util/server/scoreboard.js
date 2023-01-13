import {getData} from "./db";

async function getScoreboardData(settings){
    const url = `https://apifigur.snoffla.com/events/${
        settings.eventId}/scoreboard?type=${
        settings.type ? settings.type : ''}&count=${
        settings.count ? settings.count : ''}&offset=${
        settings.offset ? settings.offset : ''}&game_type=${
        settings.gameType ? settings.gameType : ''}&class=${
        settings.class ? settings.class : ''}
        `;
    try {
        const res = await getData(url);
        const data = await res.json();
        if(res.ok){
            return(data);
        }
        throw data.error;
    } catch (error) {
        throw error;
    }
}
export {getScoreboardData};