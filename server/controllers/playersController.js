var fs = require('fs');

module.exports = {

  allPlayers: [],
  // Returns array of all players
  getAllPlayers: function(callback) {
    callback(this.allPlayers);
  },
  // On server start, caches all player data
  prepareAllPlayers: function() {

    var allPlayers = [];

    function readFiles(dirname, onFileContent, onError, callback) {

      fs.readdir(dirname, function(err, filenames) {
        if (err) {
          onError(err);
          return;
        }

        filenames.forEach(function(filename) {
          fs.readFile(dirname + '/' + filename, 'utf-8', function(err, content) {
            if (err) {
              onError(err);
            }
            content = JSON.parse(content);
            onFileContent(filename, content);
          });
        });
      });
    }

    readFiles('./player_data', function(filename, content) {
      allPlayers.push(content);
    }, function(err) {
      // console.log(err);
    }, function(players) {
      console.log(players);
    });

    var that = this;
    setTimeout(function() {
      that.allPlayers = allPlayers;
      console.log('players in cache');
    }, 5000)
  },

  teamAcronyms: [
    'gsw', 'lac', 'lal',
    'pho', 'sac', 'dal',
    'hou', 'mem', 'nor',
    'sas', 'den', 'min',
    'okc','por','uth',
    'bos','bro','nyk',
    'phi','tor','chi',
    'cle','det','ind',
    'mil','atl','cha',
    'mia','orl', 'was'
  ],

  getPlayersByTeam: function(teamAcronym, callback) {
    // Pull all players for the team out
    var playersOnTeam = this.allPlayers.filter(function(player) {
      player.team_acronym === teamAcronym;
    });
    callback(playersOnTeam)
  }


};