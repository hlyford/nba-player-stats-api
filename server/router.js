var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = require('./server');



var router = express.Router();

router.get('/', function(req, res){
	res.send('hihi');
});


module.exports = router;
