var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan  = require('morgan')
var cors  = require('cors')

var router = require('./router');

var port = process.env.PORT || 8000;

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/../client")));

app.use('/', router);

app.listen(port);
console.log('Rent app listening on ' + port);

module.exports.app = app;
