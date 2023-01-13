const express = require('express')
const db = require('./db')
var cors = require('cors')
const app = express()
const port = 3000

var events = require("./routes/events");
var clubs = require("./routes/clubs");
var players = require("./routes/players");

var corsOptions = {
  exposedHeaders: ['X-Total-Count', 'Content-Type']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/game-types', (req, res) => {
  const sql = 'SELECT id, title FROM game_types'
  db.query(sql, {}, (err, results) =>{
      res.send(results);
  })
})

app.use("/events", events);
app.use("/clubs", clubs);
app.use("/players", players);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})