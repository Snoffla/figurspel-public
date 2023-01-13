const events = require('../modules/events');
const user = require("../modules/user");

const scores = require('../modules/scores');

const clubs = require("../modules/clubs");

const getEvents = (req, res) =>{
    const role = req.query.role;
    const code = req.query.code; 
    const active = req.query.active;
    if (code || role){
        sendEvents(res, role, code, active);
    }else{
        user.getUserFromReq(req)
        .then((user) =>{
            sendEvents(res, user.role, null, active);
        })
        .catch((err)=>{
            res.status(500).send({ error: 'Invalid data sent' });
        })
    }
}


const sendEvents = (res, role, code, active) =>{
    if(role){
        events.getEventsByRole(role, active)
        .then((data) =>{
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Database error' });
        })
    }
    else if(code){
        events.getEventsByCode(code, active)
        .then((data) =>{
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Database error' });
        })
    }
    else{
        res.status(400).send({ error: 'Insufficient request parameters' });
    }
}


const getEventClubs = (req, res) =>{
    const eventId = req.params.id;
    clubs.getClubsByEvent(eventId)
    .then((data) =>{
        res.json(data);
    })
    .catch((err) =>{
        res.status(500).send(err.message);
    })
}

const getEventClub = (req, res) =>{  
    const eventId = req.params.id;
    const clubId = req.params.clubId;
    clubs.isClubEnabled(eventId, clubId)
    .then((data) =>{
        if(data.enabled){
            clubs.getClub(clubId)
            .then((club) =>{
                club.enabled = true;
                res.json(club);
            })
            .catch((err) =>{
                res.status(500).json({error: err.message});
            })
        }else{
            res.status(500).json({error: 'Club not enabled'});
        }
    })
    .catch((err) =>{
        res.status(500).send(err.message);
    })
}

const disableClub = (req, res) => {
    user.hasPermissionForEvent(req.uid, req.params.id).then((data) =>{
        if(!data){
            res.status(401).json({message: "Access Denied"});
            return;
        }

        clubs.disableClub(req.params.id, req.body.clubId).then(() =>{
            res.json({message: "Success"});
        })
        .catch((err) => {
            res.status(500).json({message: "Error"});
        })

    })
    .catch((err) => {
        res.status(401).json({message: "Access Denied"});
    });
}

const enableClub = (req, res) => {
    user.hasPermissionForEvent(req.uid, req.params.id).then((data) =>{
        if(!data){
            res.status(401).json({message: "Success"});
            return;
        }

        clubs.enableClub(req.params.id, req.body.clubId).then(() =>{
            res.json({message: "Success"});
        })
        .catch((err) => {
            res.status(500).send("Error");
        })

    })
    .catch((err) => {
        res.status(401).send("Access Denied");
    });
}

const getSettings = (req, res) => {
    user.hasPermissionForEvent(req.uid, req.params.id).then((data) =>{
        if(!data){
            res.status(401).json({message: "Success"});
            return;
        }

        events.getSettings(req.params.id).then((settings) =>{
            res.json(settings);
        })
        .catch((err) => {
            res.status(500).send("Error, could not get settings");
        })

    })
    .catch((err) => {
        res.status(401).send(err.message);
    });
}


const setSettings = (req, res) => {
    user.hasPermissionForEvent(req.uid, req.params.id).then((data) =>{
        if(!data){
            res.status(401).json({message: "Success"});
            return;
        }

        events.setSettings(req.params.id, req.body.settings).then(() =>{
            res.json({message: "Success"});
        })
        .catch((err) => {
            res.status(500).send("Error, could not get settings");
        })

    })
    .catch((err) => {
        res.status(401).send("Access Denied");
    });
}

const getEvent = (req, res) =>{
    const id = req.params.id;
    var fields = req.params,fields;
    fields = fields.replace(/ /g, "")
    fields = fields.split(',');

}

const createEvent = (req, res) => {

    const event = {
        owner_role: req.role,
        title: req.body.title
    }
    events.createEvent(event).then((data) =>{
        res.json({id: data.insertId});
    })
    .catch((err) => {
        res.status(500).json({ error: err.message });
    });

}

const getEventScoresHead = (req, res) => {
    scores.getScoreCountForEvent(req.params.id)
    .then((count) => {
        res.set('X-Total-Count', count)
        res.status(200).end();
    }).catch((err) =>{
        res.status(400).end();
    })
}


const getClubEventStats = (req, res) => {
    const eventId = req.params.id;
    scores.getScoreCountForAllClubsInEvent(eventId).then((data) => {
        res.status(200).send(data);
    }).catch(()=> {
        res.status(500).send({error: 'An error occured while fetching data'})
    })
}
exports.getEvents = getEvents;
exports.getEventClubs = getEventClubs;

exports.getEventClub = getEventClub;
exports.disableClub = disableClub;
exports.enableClub = enableClub;

exports.getSettings = getSettings;
exports.setSettings = setSettings;

exports.createEvent = createEvent;

exports.getEventScoresHead = getEventScoresHead;

exports.getClubEventStats = getClubEventStats;