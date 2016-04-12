var express = require('express');
var path = require('path');
var fs = require('fs');
var Finder = require('fs-finder');

var app = require('./server');
var helpers = require('./helpers');

var router = express.Router();
// home page route
router.get('/', function(req, res){
	res.sendFile('index');
});

// player image route
router.get('/players/:lastname/:firstname?', function(req, res){

	var firstname = (req.params.firstname) ? helpers.capitalizeFirstLetter(req.params.firstname.toLowerCase()) : false;
	var lastname = helpers.capitalizeFirstLetter(req.params.lastname.toLowerCase());	
	
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

router.get('/*', function(req, res) {
	res.redirect('/');
})

module.exports = router;
