var express = require('express');
var router = require('./router');

var port = process.env.PORT || 8000;

var app = express();

// app.use(express.static(path.join(__dirname, "/../client/dist")));

app.use('/', router);

app.listen(port);
console.log('Rent app listening on ' + port);

module.exports.app = app;