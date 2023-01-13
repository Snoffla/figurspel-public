var db = require("../db");

const getPlayerByEmail = (email) => {
  const query =
    "SELECT id, email, name, club_id, (SELECT name FROM clubs WHERE id = p.club_id)AS club_name FROM players p WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, res) => {
      if (err) {
        reject(new Error("Database lookup error"));
      } else {
        resolve(res);
      }
    });
  });
};

const getPlayerById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, club_id FROM players WHERE id = ?",
      [id],
      (err, res) => {
        if (err) {
          reject(new Error("Database lookup error"));
        } else {
          resolve(res);
        }
      }
    );
  });
};

const createPlayer = (player) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO players (email, name, club_id, birth_date) VALUES (? ,?, ?, ?)";
    db.query(
      query,
      [player.email, player.name, player.clubId, player.birthDate],
      (err, res) => {
        if (err) {
          reject(new Error("Database lookup error"));
        } else {
          resolve(res);
        }
      }
    );
  });
};

const updatePlayerClub = (playerId, clubId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE players SET club_id = ? WHERE id = ?",
      [clubId, playerId],
      (err, res) => {
        if (err) {
          reject(new Error("Database lookup error"));
        } else {
          resolve(res);
        }
      }
    );
  });
};

exports.getPlayerById = getPlayerById;
exports.getPlayerByEmail = getPlayerByEmail;
exports.createPlayer = createPlayer;
exports.updatePlayerClub = updatePlayerClub;
