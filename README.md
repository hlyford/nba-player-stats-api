# nba-headshot-api
Easy-to-use API to retrieve NBA player headshot images (png) 

Base url: https://nba-players.herokuapp.com/

Route: GET /players/:lastName/:firstName   (more specific)

OR
 
Route: GET /players/:lastName  (may return other player with same last name)

e.g. GET https://nba-players.herokuapp.com/players/curry/stephen
