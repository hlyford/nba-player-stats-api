var request = require('request');
var cheerio = require('cheerio');
var Scraper = require("image-scraper");
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url-info').baseUrl;
var teamSlugs = require('./url-info').teamSlugs;

var playerList = [];

var getPlayers = function(urlSlug, callback) {
  var shortSlug = urlSlug.slice(0, 3);
  request(baseUrl + urlSlug, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  	// load the html for the page    
			var $ = cheerio.load(html);    
			$('.sortcell').each(function(i, element){			  
				// pull out the player's name based on the DOM  	
  			var playerName = $(element).first().text();	    
  			var $a = $(element).find('a');	    
  			var playerUrl = $a.attr('href');            
  			// for each player, make a second request using cheerio; new page is href for player image
  			request(playerUrl, function (error, response, html) {
  				if (error) throw error;
	  			if (!error && response.statusCode == 200) {			  	
	    			var $$ = cheerio.load(html);    
	    			var playerPicUrl = $$('.main-headshot').find('img').attr('src');			    
	    			if (playerPicUrl !== undefined) {
		    			playerList.push({name: playerName, imageUrl: playerPicUrl});			  			    				    
		    			// get the images and save them to the images directory				    
		    			var dlDir = './images/' + shortSlug + '/'  + playerName.replace(/ /g,"_").replace(/\'/g, '') + '.png';				    		           	
	      			var curl =  'curl ' + playerPicUrl.replace(/&/g,'\\&') + ' -o ' + dlDir  + ' --create-dirs';
	      			var child = exec(curl, function(err, stdout, stderr) {
	          		if (err){ console.log(stderr); throw err; } 
	          		else console.log(playerName + ' downloaded to ' + dlDir);
	      			});
	      		}
	  			}
				});
			});    	    
	  }    
	});	
}

for (var i = 0; i < teamSlugs.length; i++) {
	getPlayers(teamSlugs[i]);
}

