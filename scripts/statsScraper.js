var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
// var Scraper = require("image-scraper");
var fs = require('fs');
var url = require('url');
var exec = require('child_process').exec;
var baseUrl = require('./url-info').baseUrlStats;
var baseBase = require('./url-info').baseBase;
// var teamSlugs = require('./url-info').teamSlugs;
var teamsArray = require('./url-info').teamSlugsStats;

// pause between player
function sleep(miliseconds) {
  console.log('sleeping for ' + miliseconds);
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
   console.log('resume');
}


var getRosters = function (urlSlug, callback) {
  // initialize team object
  var team = {
    players: []
  };
  // form the url and go to the page
  var url = baseUrl + urlSlug + "/stats";
  request(url, function (error, response, html) {

    if (!error && response.statusCode == 200) {
      // load the html for the page
      var $ = cheerio.load(html);

      // get the team name
      var teamName = $('.IbBox h1 .ys-name').text();
      team['team_name'] = teamName;
      var teamAcronym = urlSlug;
      team['acronym'] = teamAcronym;
      var league = 'nba';
      team['league'] = league;
      // get all the player info
      var rows = $('.stats-table tbody tr');
      rows.each(function (i, element) {

          var player = {};

          var name = $(element).find('td:nth-child(1) a').text();
          player['name'] = name;
          // Team acroynym
          player['team_acronym'] = urlSlug;
          // Team name
          player['team_name'] = teamName;
          // Games played
          player['games_played'] = $(element).find('td:nth-child(2)').text();
          // Average minutes per games
          player['minutes_per_game'] = $(element).find('td:nth-child(3)').text();
          // Field goals attempted average
          player['field_goals_attempted_per_game'] = $(element).find('td:nth-child(4)').text();
          // Field goals made average
          player['field_goals_made_per_game'] = $(element).find('td:nth-child(5)').text();
          // Field goal percentage
          player['field_goal_percentage'] = $(element).find('td:nth-child(6)').text();
          // Free throw percentage
          player['free_throw_percentage'] = $(element).find('td:nth-child(9)').text();
          // Three point attempted
          player['three_point_attempted_per_game'] = $(element).find('td:nth-child(10)').text();
          // Three point made
          player['three_point_made_per_game'] = $(element).find('td:nth-child(11)').text();
          // Three point percentage
          player['three_point_percentage'] = $(element).find('td:nth-child(12)').text();
          // Pts per game average
          player['points_per_game'] = $(element).find('td:nth-child(13)').text();
          // Offensive rebounds per game
          player['offensive_rebounds_per_game'] = $(element).find('td:nth-child(14)').text();
          // Defensive rebounds per game
          player['defensive_rebounds_per_game'] = $(element).find('td:nth-child(15)').text();
          // Rebounds per game
          player['rebounds_per_game'] = $(element).find('td:nth-child(16)').text();
          // Assists per game
          player['assists_per_game'] = $(element).find('td:nth-child(17)').text();
          // Steals per game
          player['steals_per_game'] = $(element).find('td:nth-child(18)').text();
          // Blocks per game
          player['blocks_per_game'] = $(element).find('td:nth-child(19)').text();
          // Turnovers per game
          player['turnovers_per_game'] = $(element).find('td:nth-child(20)').text();
          // Player efficiency rating
          player['player_efficiency_rating'] = $(element).find('td:nth-child(21)').text();

          for (key in player) {
            if (player[key] === '') {
              player[key] = 'Not available';
            }
          }
          team.players.push(player);
      });
    } else {
      console.log(error);
    }

    // Write to a file
    // fs.writeFile('./player_data_by_team/' + urlSlug + '.json', JSON.stringify(team), function() {
    //   console.log(`Added ${urlSlug} to file.`);
    // });
    // Loop through and add each player as json file, e.g. 'stephen_curry.json'
    for (var b = 0; b < team.players.length; b++) {
      var currentPlayer = team.players[b];
      var normalizedName = currentPlayer.name.toLowerCase().replace(/ /g, "_").replace(/\'/g, '').replace(/\./g, '');
      // Write the player data to directory as json
      fs.writeFile(`player_data/${normalizedName}.json`, JSON.stringify(currentPlayer), (err) => {
        if (err) throw err;
      });

    }
    console.log(`Added ${urlSlug} players as json files.`);
  });
}

// loop through waiting a random amount of seconds each time
// ***** NBA  // there are 30 teams
function looper (start, end) {
  var nextWait = Math.floor(Math.random() * (8000 - 4000) + 4000);
  console.log('waiting...', nextWait);
  if (start < end) {
    getRosters(teamsArray[start]);
    setTimeout(function () {
      looper(start + 1, end);
    }, nextWait);
  } else {
    console.log('done');
    return;
  }
};

looper(29, 30);

module.exports = getRosters;
