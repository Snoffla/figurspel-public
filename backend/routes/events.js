var express = require('express');
var router = express.Router();

const user = require("../modules/user");

const events = require("../controllers/eventsController");
const scores = require("../controllers/scoresController");
const scoreboard = require("../controllers/scoreboardController");

router.get("/", function(req, res, next) { 
    events.getEvents(req, res);
});

router.get("/:id", function(req, res, next) {

});

// ---- Event Settings ----

router.get("/:id/settings",  user.checkIfAuthenticated, function(req, res, next) {
    events.getSettings(req, res);
});

router.put("/:id/settings",  user.checkIfAuthenticated, function(req, res, next) {
    events.setSettings(req, res);
});

// ---- Event Clubs ---- 

router.get("/:id/clubs/stats", user.checkIfAuthenticatedForEvent ,function(req, res, next) {
    events.getClubEventStats(req, res);
});


//Is club enabled
router.get("/:id/clubs/:clubId", function(req, res, next) {
    events.getEventClub(req, res);
});

//Get enabled clubs
router.get("/:id/clubs", function(req, res, next) {
    events.getEventClubs(req, res);
});

//Enable
router.post("/:id/clubs", user.checkIfAuthenticated, function(req, res, next) {
    events.enableClub(req, res);
});

//Disable
router.delete("/:id/clubs", user.checkIfAuthenticated, function(req, res, next) {
    events.disableClub(req, res);
});

// ---- Event Scores ----


router.post("/:id/scores", function(req, res, next) {
    scores.createScore(req, res);
});

router.head("/:id/scores", function(req, res, next) {
    events.getEventScoresHead(req, res);
});

router.get("/:id/scores", user.checkIfAuthenticatedForEvent, function(req, res, next) {
    scores.getScores(req, res);
});

router.delete("/:id/scores/:scoreId", user.checkIfAuthenticatedForEvent, function(req, res, next) {
    scores.deleteScore(req, res);
});

// ---- Create Event ----
router.post("/", user.checkIfAuthenticated,function(req, res, next) {
    events.createEvent(req, res);
});


// ---- Scoreboard ----

router.get("/:id/scoreboard", function(req, res, next) {
    scoreboard.getEventScoreboard(req, res);
});

module.exports = router;