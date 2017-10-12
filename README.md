# nba-headshot-api
**UPDATED FOR 2017-2018 SEASON**

Easy-to-use API to retrieve NBA player headshot images (png)

Base url: https://nba-players.herokuapp.com/

Route: GET /players/:lastName/:firstName   (more specific)

OR

Route: GET /players/:lastName  (may return other player with same last name)

e.g. GET https://nba-players.herokuapp.com/players/curry/stephen

e.g. GET https://nba-players.herokuapp.com/players/mcadoo/james_michael

e.g. GET https://nba-players.herokuapp.com/players/ennis_iii/james
