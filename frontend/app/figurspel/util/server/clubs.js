import {getData} from "./db";

async function getClubs(){
    const url = `https://apifigur.snoffla.com/clubs`;
    try {
        const data = await getData(url);
        if (data.error || !data) return ([]);
        return(data);
    } catch (error) {
        return([]);
    }
}

export {getClubs};