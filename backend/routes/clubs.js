var express = require('express');
var router = express.Router();

const user = require("../modules/user");

const clubs = require("../controllers/clubsController");

router.get("/", function(req, res, next) { 
    clubs.getClubs(req, res);
    //user.checkIfAuthenticated
});




module.exports = router;