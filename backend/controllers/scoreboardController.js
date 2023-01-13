const scoreboard = require("../modules/scoreboard");

const getEventScoreboard = (req, res) => {
    const MAX_COUNT = 100;
    const eventId = req.params.id;
    var scoreboardType = req.query.type ? req.query.type : '';
    var gameType;
    var count;
    var offset;
    var order;
    var playerClass;

    //Count
    if (isNumber(req.query.count)){
        count = parseInt(req.query.count);
        if (count > MAX_COUNT){
            count = MAX_COUNT;
        }
    }else{
        count = 10;
    }

    //Offset
    if (isNumber(req.query.offset)){
        offset = parseInt(req.query.offset);
    }else{
        offset = 0;
    }

    //Order
    order = (req.query.order ? req.query.order.toLowerCase() : '') === 'asc' ? 'asc' : 'desc';

    //GameType
    //Convert game type string to id.
    switch (req.query.game_type ? req.query.game_type.toLowerCase() : ''){
        case 'classic': 
            gameType = 1;
            break;
        case 'modern': 
            gameType = 2;
            break;
        case 'kids': 
            gameType = 3;
            break;
        case 'all':
            gameType = undefined;
            break;
        default:
            gameType = 1;
    }

    //Klass Women or Men
    switch (req.query.class ? req.query.class.toLowerCase() : ''){
        case 'women':
        case 'w': 
            playerClass = 'w';
            break;
        case 'men': 
        case 'm':
            playerClass = 'm';
            break;
        case 'junior': 
        case 'j':
                playerClass = 'j';
                break;
        case 'wheelchair': 
        case 'r':
            playerClass = 'r';
            break;
        default:
            playerClass = null;
    }

    var settings = {
        eventId: eventId,
        gameType: gameType,
        count: count,
        offset: offset,
        order: order,
        class: playerClass
    }

    //
    switch (scoreboardType.toLowerCase()){
        case 'standard':
            sendStandardScoreboard(res, settings);
            break;
        case 'hundred':
            sendHundredScoreboard(res, settings);
            break;
        case 'club_count':
            sendClubScoreCountScoreboard(res, settings);
            break;
        case 'country_count':
            sendCountryScoreCountScoreboard(res, settings);
            break;
        case 'country_sum':
            sendCountryScoreSumScoreboard(res, settings);
            break;
        default:
            res.status(400).json({error: 'Insufficient data sent'});
    }
}

function sendStandardScoreboard(res, settings){
    scoreboard.getStandardScoreboard(settings)
    .then((data) => {
        var finalData = {
            rows: data,
            labels: ['Namn', 'Klubb', 'Poäng']
        }
        res.status(200).json(finalData);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch scoreboard'});
    })
}

function sendHundredScoreboard(res, settings){
    scoreboard.getHundredScoreboard(settings)
    .then((data) => {
        var finalData = {
            rows: data,
            labels: ['Namn', 'Klubb', 'Poäng']
        }
        res.status(200).json(finalData);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch scoreboard'});
    })
}

function sendClubScoreCountScoreboard(res, settings){
    scoreboard.getClubScoreCountScoreboard(settings)
    .then((data) => {
        var finalData = {
            rows: data,
            labels: ['Klubb', 'Spelade serier']
        }
        res.status(200).json(finalData);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch scoreboard'});
    })
}

function sendCountryScoreCountScoreboard(res, settings){
    scoreboard.getCountryScoreCountScoreboard(settings)
    .then((data) => {
        var finalData = {
            rows: data,
            labels: ['Land', 'Spelade serier']
        }
        res.status(200).json(finalData);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch scoreboard'});
    })
}

function sendCountryScoreSumScoreboard(res, settings){
    scoreboard.getCountryScoreSumScoreboard(settings)
    .then((data) => {
        var finalData = {
            rows: data,
            labels: ['Land', 'Total poäng']
        }
        res.status(200).json(finalData);
    })
    .catch((err) => {
        res.status(500).json({error: 'Could not fetch scoreboard'});
    })
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

exports.getEventScoreboard = getEventScoreboard;