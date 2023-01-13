var express = require("express");
var router = express.Router();

const user = require("../modules/user");
const players = require("../controllers/playersController");

router.get("/:id", function (req, res, next) {
  players.getPlayerById(req, res);
});

router.get("/", function (req, res, next) {
  players.getPlayerByEmail(req, res);
});

router.post("/", function (req, res, next) {
  players.createPlayer(req, res);
});

router.post("/", function (req, res, next) {
  players.createPlayer(req, res);
});

router.put("/:id/club", user.checkIfAuthenticated, function (req, res, nest) {
  players.updatePlayerClub(req, res);
});

module.exports = router;
