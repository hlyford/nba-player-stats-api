var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var Finder = require('fs-finder');

var app = require('./server');
var helpers = require('./helpers');
var playersController = require('./controllers/playersController');

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// home page route
router.get('/', function(req, res){
	res.sendFile('index');
});

// Prepare all players object when server starts
playersController.prepareAllPlayers();

// Player IMAGE route
router.get('/players/:lastname/:firstname?', function(req, res){

	var firstname = (req.params.firstname) ? req.params.firstname.toLowerCase() : false;
	var lastname = req.params.lastname.toLowerCase();

	// if both names are provided
	if (firstname) {
		var fullName = firstname + "_" + lastname + ".png";
		console.log("Looking for : ", fullName);

		// search the team directories until finds right name
		Finder.from('./images').findFiles(fullName, function(files) {
			if (files.length === 0) res.send( 'Sorry, that player was not found. Please check the spelling.');
			else res.sendFile(files[0]);
		});

	// if only the last name is supplied
	} else {
		console.log("Looking for : ", lastname);
		Finder.from('./images').findFiles('*' + lastname + '*', function(files) {
			if (files.length === 0) res.send( 'Sorry, that player was not found. Please check the spelling.');
			else res.sendFile(files[0]);
		});
	}

});

// Get player DATA
router.get('/players-stats/:lastname/:firstname?', function(req, res){

	var firstname = (req.params.firstname) ? req.params.firstname.toLowerCase() : false;
	var lastname = req.params.lastname.toLowerCase();

	// if both names are provided
	if (firstname) {
		var fullName = firstname + "_" + lastname + ".json";
		console.log("Looking for : ", fullName);

		// search the team directories until finds right name
		Finder.from('./player_data').findFiles(fullName, function(files) {
			if (files.length === 0) res.send( 'Sorry, that player was not found. Please check the spelling.');
			else res.sendFile(files[0]);
		});

	// if only the last name is supplied
	} else {
		console.log("Looking for last name: ", lastname);
		Finder.from('./player_data').findFiles('*' + lastname + '*', function(files) {
			if (files.length === 0) res.send( 'Sorry, that player was not found. Please check the spelling.');
			else res.sendFile(files[0]);
		});
	}

});
// Returns all players
router.get('/players-stats', function(req, res) {
	playersController.getAllPlayers(function(players) {
		res.send(players);
	});
});

// Get TEAM acronyms
router.get('/teams', function(req, res) {
	console.log('ihihi');
	res.send(playersController.teamAcronyms);
});

// Get player data by TEAM
router.get('/players-stats-teams/:team?', function(req, res) {
	var teamAcronym = req.params['team'];
	playersController.getPlayersByTeam(teamAcronym ,function(players) {
		res.send(players);
	});
});

// router.get('/*', function(req, res) {
// 	res.redirect('/');
// })

module.exports = router;
