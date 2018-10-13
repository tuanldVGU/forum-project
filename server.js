// Variable
const cookieParser = require('cookie-parser');
const http = require('http'); //HTTP Protocol
const express = require('express'); //Express Framework
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const ejsmate = require('ejs-mate');
const mongoose = require('mongoose'); // View engine
const passport = require('passport');
require('./passport/passport')(passport);
const flash = require('connect-flash');

require('./init');
var app = express();

//Middleware and config
  //body-parser
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: false}));
  // cookieParser
app.use(cookieParser());
  //public folder
app.use(express.static(path.join(__dirname,'public')));
  // view engine
app.engine('ejs',ejsmate);
app.set('view engine','ejs');
  // passport set-up
app.use(session({
	secret: 'thesecret',
	saveUninitialized: false,
	resave: false
  }))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routing
var main = require('./routes/mainRoute');
var thread = require('./routes/threadRoute');
var auth = require('./routes/auth')(passport);
app.use('/',main);
app.use('/forum',thread);
app.use('/auth',auth);
app.use('/service', require('./routes/main'));

// Start the server
const PORT = process.env.PORT || 8000;
http.createServer(app).listen(process.env.PORT || 8000,function(){
	console.log("App running on port "+ PORT);
});

module.exports = app;
