const clubs = require("../modules/clubs");

const getClubs = (req, res) =>{

    clubs.getClubs(req)
    .then((clubs) =>{
        res.json(clubs);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

exports.getClubs = getClubs;