const events = require("../modules/events");
const clubs = require("../modules/clubs");
const players = require("../modules/players");

const playerAuth = require("../modules/playerAuth");

const getPlayerById = (req, res) => {
  const id = req.params.id;
  if (id) {
    players
      .getPlayerById(id)
      .then((data) => {
        if (data.length > 0) {
          res.json(data[0]);
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ error: "Database error" });
      });
  } else {
    res.status(400).send({ error: "Insufficient request parameters" });
  }
};

const getPlayerByEmail = (req, res) => {
  const email = req.query.email;
  if (email) {
    players
      .getPlayerByEmail(email)
      .then((data) => {
        if (data.length > 0) {
          res.json(data[0]);
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res.status(500).send("Database error");
      });
  } else {
    res.status(400).send({ error: "Insufficient request parameters" });
  }
};

const createPlayer = (req, res) => {
  var player;
  if (typeof req.body.player === "object" && req.body.player !== null) {
    player = req.body.player;
  } else {
    player = JSON.parse(req.body.player);
  }
  const code = req.body.code;

  playerAuth
    .codeExists(code)
    .then(() => {
      players
        .createPlayer(player, code)
        .then((data) => {
          res.json({ id: data.insertId });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(401).json({ error: err.message });
    });
};

const updatePlayerClub = (req, res) => {
  if (req.params.id && req.body.clubId) {
    players
      .updatePlayerClub(req.params.id, req.body.clubId)
      .then(() => {
        res.json({ message: "Success" });
      })
      .catch((err) => {
        res.status(500).send("Error, could not set new club");
      });
  } else {
    res
      .status(400)
      .send(
        "Error, not enought information sent, player id and club id must be given."
      );
  }
};

exports.getPlayerById = getPlayerById;
exports.getPlayerByEmail = getPlayerByEmail;
exports.createPlayer = createPlayer;
exports.updatePlayerClub = updatePlayerClub;
