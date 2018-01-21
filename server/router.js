var express = require('express');
var path = require('path');
var fs = require('fs');
var Finder = require('fs-finder');

var app = require('./server');
var helpers = require('./helpers');
var playersController = require('./controllers/playersController');

var router = express.Router();
// home page route
router.get('/', function(req, res){
	res.sendFile('index');
});

// player image route
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

// Get player data
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



// Prepare all players object
playersController.prepareAllPlayers();

router.get('/players-stats', function(req, res) {
	playersController.getAllPlayers(function(players) {
		res.send(players);
	});

});


router.get('/*', function(req, res) {
	res.redirect('/');
})


module.exports = router;
