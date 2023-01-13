const scores = require("../modules/scores");
const playerAuth = require("../modules/playerAuth");

const createScore = (req, res) => {
    const eventId = req.params.id;
    const playerId = req.body.playerId;
    const score = req.body.score;
    const code = req.body.code;
    const gameTypeId = req.body.gameTypeId;
    const playerClass = req.body.class

    playerAuth.codePlayerEventCheck(code, eventId, playerId)
    .then(() => {
        scores.createScore(score, eventId, playerId, gameTypeId, playerClass)
        .then((data) => {
            res.json({id: data.insertId});
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    }).catch((err) =>{
        res.status(401).json({ error: err.message });
    })
}

const deleteScore = async (req, res) =>{
    const eventId = req.params.id;
    const scoreId = req.params.scoreId;

    try { 
        const hasAccess = await scores.isScoreinEvent(eventId, scoreId);
        console.log(hasAccess);
        if(hasAccess){
            await scores.deleteScore(scoreId , eventId);
            res.status(200).send({message: 'Score deleted'});
        }else{
            res.status(401).send();
        }
    } catch (error) {
        res.status(401).send();
    }
}

const getScores = async (req, res) =>{
    const eventId = req.params.id;

    var gameType;
    var count;
    var offset;
    var order;
    var clubId;

    //Club
    if(isNumber(req.query.club_id)){
        clubId = req.query.club_id;
    }else{
        clubId = null;
    }

    //Count
    if (isNumber(req.query.count)){
        count = parseInt(req.query.count);
    }else{
        count = 25;
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
            gameType = null;
            break;
        default:
            gameType = null;
    }

    var settings = {
        eventId: eventId,
        gameType: gameType,
        count: count,
        offset: offset,
        order: order,
        clubId: clubId
    }

    try { 
        const scoreCount = await scores.getScoresCount(settings);
        const data = await scores.getScores(settings);
        res.set('X-Total-Count', scoreCount);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error});
    }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

exports.createScore = createScore;
exports.getScores = getScores;

exports.deleteScore = deleteScore;