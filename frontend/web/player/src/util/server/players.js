import {getData, postData} from "./db";

async function getPlayerByEmail(email){
    const url = `https://apifigur.snoffla.com/players?email=${email}`;
    try {
        const data = await getData(url);
        if (data.error || !data) return ({});
        const player = {
            id: data.id,
            name: data.name,
            clubId: data.club_id,
            birthDate: data.birth_date
        }
        return(player);
    } catch (error) {
        console.log(error);
        return({});
    }
}

async function createPlayer(player, code){
    const url = `https://apifigur.snoffla.com/players`;
    var jsonData = {
        code: code,
        player: player
    }
    try {
        const res = await postData(url, jsonData);
        const data = await res.json();
        if (data.error || !data) return ({error: data.error});
        return(data);
    } catch (error) {
        console.log(error);
        return({});
    }
}
export {getPlayerByEmail, createPlayer};