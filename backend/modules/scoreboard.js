var db = require("../db");

const getStandardScoreboard = (settings) => {
    const query = `
    SELECT
        (SELECT players.name FROM players WHERE players.id = scores.player_id) AS name,
        (SELECT clubs.name FROM clubs WHERE clubs.id = (SELECT players.club_id FROM players WHERE players.id = scores.player_id)) AS club,
        MAX(score) AS score
    FROM scores
    WHERE event_id = ? AND (? IS NULL OR game_type_id = ?) AND (? IS NULL OR class = ?)
    GROUP BY player_id
    ORDER BY score  DESC 
    LIMIT ?
    OFFSET ?`;  

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,
        settings.count,
        settings.offset
    ]
    
    return db.queryPromise(query, values);
}

const getHundredScoreboard = (settings) => {
    const query = `
    SELECT
        (SELECT players.name FROM players WHERE players.id = scores.player_id) AS name,
        (SELECT clubs.name FROM clubs WHERE clubs.id = (SELECT players.club_id FROM players WHERE players.id = scores.player_id)) AS club,
        MAX(score + TIMESTAMPDIFF(YEAR,(SELECT players.birth_date FROM players WHERE players.id = scores.player_id),time)) AS score
    FROM scores
    WHERE event_id = ? 
        AND (? IS NULL OR game_type_id = ?)
        AND (? IS NULL OR class = ?) 
        AND score + TIMESTAMPDIFF(YEAR,(SELECT players.birth_date FROM players WHERE players.id = scores.player_id),time) >= 100
    GROUP BY player_id
    ORDER BY score  DESC 
    LIMIT ?
    OFFSET ?`;  

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,
        settings.count,
        settings.offset
    ]
    
    return db.queryPromise(query, values);
}

const getClubScoreCountScoreboard = (settings) => {
    const query = `
    SELECT 
        name, 
        @score := CAST((SELECT
            COUNT(*)
            FROM scores
            WHERE event_id = ?
             AND (? IS NULL OR game_type_id = ?) 
             AND ((SELECT club_id FROM players WHERE players.id = player_id ) = clubs.id) 
             AND (? IS NULL OR class = ?)
             ) AS UNSIGNED) AS score
    FROM clubs
    WHERE CAST((SELECT
        COUNT(*)
        FROM scores
        WHERE event_id = ?
        AND (? IS NULL OR game_type_id = ?) 
        AND ((SELECT club_id FROM players WHERE players.id = player_id ) = clubs.id) 
        AND (? IS NULL OR class = ?)
        ) AS UNSIGNED) > 0
    ORDER BY 
    CAST((SELECT
        COUNT(*)
        FROM scores
        WHERE event_id = ?
        AND (? IS NULL OR game_type_id = ?) 
        AND ((SELECT club_id FROM players WHERE players.id = player_id ) = clubs.id) 
        AND (? IS NULL OR class = ?)
        ) AS UNSIGNED) DESC
    LIMIT ?
    OFFSET ?
    `;  

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,
        
        settings.count,
        settings.offset
    ]
    return db.queryPromise(query, values);
}

const getCountryScoreCountScoreboard = (settings) => {
    const query = `
        SELECT 
        name, 
        @score := CAST((SELECT
            COUNT(*)
            FROM scores
            WHERE event_id = ?
            AND (? IS NULL OR game_type_id = ?) 
            AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
            AND (? IS NULL OR class = ?)
            ) AS UNSIGNED) AS score
    FROM countries
    WHERE CAST((SELECT
            COUNT(*)
            FROM scores
            WHERE event_id = ?
            AND (? IS NULL OR game_type_id = ?) 
            AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
            AND (? IS NULL OR class = ?)
            ) AS UNSIGNED) > 0
    ORDER BY 
    CAST((SELECT
            COUNT(*)
            FROM scores
            WHERE event_id = ?
            AND (? IS NULL OR game_type_id = ?) 
            AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
            AND (? IS NULL OR class = ?)
            ) AS UNSIGNED) DESC
    LIMIT ?
    OFFSET ?
    `;

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,
        
        settings.count,
        settings.offset
    ]
    return db.queryPromise(query, values);
}

const getCountryScoreSumScoreboard = (settings) => {
    const query = `
        SELECT 
        name, 
        @score := CAST((SELECT
            SUM(score)
            FROM scores
            WHERE event_id = ?
            AND (? IS NULL OR game_type_id = ?) 
            AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
            AND (? IS NULL OR class = ?)
            ) AS UNSIGNED) AS score
        FROM countries
        WHERE CAST((SELECT
            SUM(score)
                FROM scores
                WHERE event_id = ?
                AND (? IS NULL OR game_type_id = ?) 
                AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
                AND (? IS NULL OR class = ?)
                ) AS UNSIGNED) > 0
        ORDER BY 
        CAST((SELECT
            SUM(score)
                FROM scores
                WHERE event_id = ?
                AND (? IS NULL OR game_type_id = ?) 
                AND ((SELECT country_id FROM clubs WHERE clubs.id = (SELECT club_id FROM players WHERE players.id = player_id)) = countries.id) 
                AND (? IS NULL OR class = ?)
                ) AS UNSIGNED) DESC
        LIMIT ?
        OFFSET ?
    `;

    const values = [
        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,

        settings.eventId,
        settings.gameType, settings.gameType,
        settings.class, settings.class,
        
        settings.count,
        settings.offset
    ]
    return db.queryPromise(query, values);
}

exports.getStandardScoreboard = getStandardScoreboard;
exports.getHundredScoreboard = getHundredScoreboard;

exports.getClubScoreCountScoreboard = getClubScoreCountScoreboard;
exports.getCountryScoreCountScoreboard = getCountryScoreCountScoreboard;
exports.getCountryScoreSumScoreboard = getCountryScoreSumScoreboard;