var db = require("../db");
const clubs = require("../modules/clubs");

const codeExists = (code) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT Count(1) AS "exist" from events WHERE code = ? AND active = 1', [code], (err, res) => {
            if (err) {
                reject(new Error("Unauthorized"));
            }
            else if(!res[0].exist){
                reject(new Error("Unauthorized"));
            }
            else{
                resolve(true);
            }
        });
    });
}

const codePlayerEventCheck = (code, eventId, playerId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT Count(1) AS "exist" from events WHERE code = ? AND id = ? AND active = 1 ', [code, eventId], (err, res) => {
            if (err) {
                reject(new Error("Unauthorized"));
            }
            else if(!res[0].exist){
                reject(new Error("Unauthorized"));
            }
            else{
                const queryString = `
                    SELECT Count(1) AS "exist" from events_clubs WHERE event_id = ? AND club_id = (SELECT club_id FROM players WHERE id = ?)
                `;
                db.query(queryString, [eventId, playerId], (err, res) => {
                    if (err) {
                        reject(new Error("Unauthorized"));
                    }
                    else if(!res[0].exist){
                        reject(new Error("Unauthorized"));
                    }
                    else{
                        resolve(true);
                    }
                });
            }
        });
    });
}

exports.codeExists = codeExists;
exports.codePlayerEventCheck = codePlayerEventCheck;