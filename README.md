# nba-player-stats-api
**LAST UPDATED: January 19th, 2018**

Easy-to-use API to retrieve NBA player statistics headshot images (png)

Base url: https://nba-players.herokuapp.com/

__Routes__

**Player statistics (returns JSON)**

Get all players
*GET /players-stats*

Get one player
*GET /players-stats/:lastName/:firstName*

e.g. GET https://nba-players.herokuapp.com/players-stats/james/lebron

Get all team acronyms
*GET /teams*

Get all players on one team
*GET /players-stats-teams/:team*

e.g. GET https://nba-players.herokuapp.com/players-stats-teams/cle

**Player images**

*GET /players/:lastName/:firstName*   (more specific)

OR

*GET /players/:lastName*  (may return other player with same last name)

e.g. GET https://nba-players.herokuapp.com/players/curry/stephen

e.g. GET https://nba-players.herokuapp.com/players/mcadoo/james_michael

e.g. GET https://nba-players.herokuapp.com/players/ennis_iii/james
