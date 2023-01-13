var db = require("../db");


const getClubsByEvent = (eventId) =>{

    const queryString = `
    SELECT c.id, c.name
    FROM events as e, clubs as c, events_clubs as ec
    WHERE ec.event_id = ?
    AND ec.event_id = e.id
    AND ec.club_id = c.id
        `;
    return new Promise((resolve, reject) => {
        db.query(queryString, [eventId], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const getClubs = () =>{

    const queryString = `
    SELECT clubs.id, clubs.name FROM clubs ORDER BY clubs.name
        `;
    return new Promise((resolve, reject) => {
        db.query(queryString, (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const getClub = (id) =>{

    const queryString = `
    SELECT id, name FROM clubs WHERE id = ?
        `;
    return new Promise((resolve, reject) => {
        db.query(queryString, [id], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else if(res.length != 1){
                reject(new Error("Club not found"));
            }
            else{
                resolve(res[0]);
            }
        });
    });
}

const enableClub = (event_id, club_id) =>{
    const queryString = `
        INSERT INTO events_clubs (event_id, club_id)
        SELECT ?, ?
        WHERE NOT EXISTS (SELECT event_id FROM events_clubs WHERE event_id = ? AND club_id = ?);
    `;
    return new Promise((resolve, reject) => {
        db.query(queryString, [event_id, club_id, event_id, club_id], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const disableClub = (event_id, club_id) =>{
    const queryString = `
        DELETE FROM events_clubs WHERE event_id = ? AND club_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(queryString, [event_id, club_id], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const isClubEnabled = (event_id, club_id) => {
    const queryString = `
        SELECT Count(1) AS enabled FROM events_clubs WHERE event_id = ? AND club_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(queryString, [event_id, club_id], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res[0]);
            }
        });
    });
}

exports.getClubsByEvent = getClubsByEvent;
exports.getClubs = getClubs;

exports.getClub = getClub;

exports.enableClub = enableClub;
exports.disableClub = disableClub;

exports.isClubEnabled = isClubEnabled;


