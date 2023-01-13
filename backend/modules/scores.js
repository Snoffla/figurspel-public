var db = require("../db");

const createScore = (score, eventId, playerId, gameTypeId, playerClass) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO scores (score, event_id, player_id, game_type_id, class) VALUES (? ,?, ?, ?, ?)';
        db.query(query, [score, eventId, playerId, gameTypeId, playerClass], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const isScoreinEvent = (eventId, scoreId) =>{
    return new Promise(async (resolve, reject) => {
        try {
          db.query('SELECT Count(1) AS value FROM scores WHERE id = ? AND event_id = ?', [scoreId, eventId], (err, res) => {
            const data = Object.values(JSON.parse(JSON.stringify(res)))[0];
            if (err) {
              reject(false);
            }
            else if (!data.value) {
              reject(false);
            }
            else{
                resolve(true);
            }
          });
        } catch (error) {
          reject(false);
        }
    });
}

const deleteScore = (scoreId, eventId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM scores WHERE id = ? AND event_id = ?';
        db.query(query, [scoreId, eventId], (err, res) => {
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(res);
            }
        });
    });
}

const getScoreCountForEvent = (eventId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Count(*) AS total FROM `scores` WHERE event_id = ?';
        db.query(query, [eventId], (err, res) => {
            const data = Object.values(JSON.parse(JSON.stringify(res)))[0];
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(data.total);
            }
        });
    });
}

const getScoresCount = (settings) => {
    var query = `
    SELECT
        COUNT(*) as total
    FROM scores
    WHERE event_id = ? AND (? IS NULL OR game_type_id = ?) AND (? IS NULL OR (SELECT club_id FROM players WHERE players.id = player_id) = ?)
    `;

    if(settings.unique) {
        query = `
        SELECT 
        COUNT(*)
        FROM
        (SELECT id 
            FROM scores 
            WHERE event_id = ? AND (? IS NULL OR game_type_id = ?) AND (SELECT club_id FROM players WHERE players.id = player_id) = ?
            GROUP BY player_id) AS unique_scores
        `;
    }

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.clubId, settings.clubId
    ]
    
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            const data = Object.values(JSON.parse(JSON.stringify(res)))[0];
            if (err) {
                reject(new Error("Database lookup error"));
            }
            else{
                resolve(data.total);
            }
        });
    });
}

const getScores = (settings) => {
    const query = `
    SELECT
        id,
        (SELECT players.name FROM players WHERE players.id = scores.player_id) AS name,
        (SELECT clubs.name FROM clubs WHERE clubs.id = (SELECT players.club_id FROM players WHERE players.id = scores.player_id)) AS club,
        (SELECT title FROM game_types WHERE id = game_type_id) AS gameType,
        score,
        time
    FROM scores
    WHERE event_id = ? AND (? IS NULL OR game_type_id = ?) AND (? IS NULL OR (SELECT club_id FROM players WHERE players.id = player_id) = ?)
    ORDER BY time ${settings.order}
    LIMIT ?
    OFFSET ?`;  

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.clubId, settings.clubId,
        settings.count,
        settings.offset
    ]
    return db.queryPromise(query, values);
}

const getScoreCountForAllClubsInEvent = (eventId) => {
    const query = `
    SELECT @id := id AS id, name, 
    (SELECT
        COUNT(*)
        FROM scores
        WHERE event_id = ? AND ((SELECT club_id FROM players WHERE players.id = player_id) = @id)) AS total
    FROM clubs
    `;  

    const values = [
        eventId,
    ]
    return db.queryPromise(query, values);
}

exports.createScore = createScore;
exports.getScoreCountForEvent = getScoreCountForEvent;
exports.getScores = getScores;
exports.getScoresCount = getScoresCount;

exports.isScoreinEvent = isScoreinEvent;
exports.deleteScore = deleteScore;

exports.getScoreCountForAllClubsInEvent = getScoreCountForAllClubsInEvent;