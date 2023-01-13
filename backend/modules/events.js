var db = require("../db");


const getEventsByRole = (role, active) =>{
    if (active == null){
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title, active FROM events WHERE owner_role = ? ORDER BY creation_time DESC', [role], (err, res) => {
                if (err) {
                    reject(new Error("Database lookup error"));
                }
                else{
                    resolve(res);
                }
            });
        });
    }else{
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title, active FROM events WHERE owner_role = ? AND active = ? ORDER BY creation_time DESC', [role, active], (err, res) => {
                if (err) {
                    reject(new Error("Database lookup error"));
                }
                else{
                    resolve(res);
                }
            });
        });
    }

}

const getEventsByCode = (code, active) =>{
    if (active == null){
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title, active FROM events WHERE code = ? ORDER BY creation_time DESC', [code], (err, res) => {
                if (err) {
                    reject(new Error("Database lookup error"));
                }
                else{
                    resolve(res);
                }
            });
        });
    }else{
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title, active FROM events WHERE code = ? AND active = ? ORDER BY creation_time DESC', [code, active], (err, res) => {
                if (err) {
                    reject(new Error("Database lookup error"));
                }
                else{
                    resolve(res);
                }
            });
        });
    }
}


const getSettings = (eventId) =>{
    return new Promise((resolve, reject) => {
        db.query('SELECT title, code, active FROM events WHERE id = ? ', [eventId], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const setSettings = (eventId, settings) =>{
    return new Promise((resolve, reject) => {
        db.query('UPDATE events SET title = ?, code = ?, active = ? WHERE id = ? ', 
        [settings.title, settings.code, settings.active, eventId], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const getEvent = (eventId, fields) =>{
    var sqlFields = '';

    return new Promise((resolve, reject) => {
        db.query('SELECT title FROM events WHERE id = ? ', [eventId], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const createEvent = (event) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO events (title, owner_role) VALUES (? ,?)';
        db.query(query, [event.title, event.owner_role], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

exports.getEventsByRole = getEventsByRole;
exports.getEventsByCode  = getEventsByCode;

exports.getSettings = getSettings;
exports.setSettings = setSettings;

exports.createEvent = createEvent;