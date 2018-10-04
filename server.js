
const http = require('http'); //HTTP Protocol
var express = require('express'); //Express Framework
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate'); // View engine

var app = express();

// Middleware and config
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsmate);
app.set('view engine','ejs');

// Routing
var main = require('./routes/mainRoute');
var thread = require('./routes/threadRoute');

app.use('/',main);
app.use('/forum',thread);

// Start the server
const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT,function(){
	console.log("App running on port "+ PORT);
});