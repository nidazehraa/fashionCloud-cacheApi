var express = require('express'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	errorHandler = require('errorhandler');


// setting up config for mongodb server
var config = JSON.parse(fs.readFileSync('./config/dbserver.json', 'utf-8'));
mongoose.connect(config.mongodb.url, { useMongoClient: true });

// checking connectivity with mongodb server
mongoose.connection.once('open', function(){
	console.log("MongoDb connection successfull");
}).on('error', function(err) {
	console.error('Error while making connection with mongo db error: %s', err);
});

// setting up express env
var app = express();
app.set('port', 8080);

//setup error handler in case of development env
if (app.get('env') === 'development') {
	app.use(errorHandler());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// routes
require('./routes').init(app);

// Populate DB with sample data
if (config.mongodb.seed)
	require('./seed');


//setting up express port connecttion
var server = app.listen(app.get('port'), function() {
	console.log('Express server connection on port ' + server.address().port);
});

module.exports = app;