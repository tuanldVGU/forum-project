// Variable
var cookieParser = require('cookie-parser');
const http = require('http'); //HTTP Protocol
var express = require('express'); //Express Framework
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session=require('express-session');
var ejsmate = require('ejs-mate');
var mongoose= require('mongoose'); // View engine
var passport=require('passport');
require('./passport/passport')(passport);
var flash = require('connect-flash');

//Initialize our app
var app = express();

//Mongoose Database Set-up
var url = 'mongodb://admin:admin123@ds223253.mlab.com:23253/forum';
mongoose.connect(url,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

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
app.use(passport.initialize())
app.use(passport.session())

// Routing
var main = require('./routes/mainRoute');
var thread = require('./routes/threadRoute');
var auth = require('./routes/auth')(passport);
app.use('/',main);
app.use('/forum',thread);
app.use('/auth',auth);
// Start the server
const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT,function(){
	console.log("App running on port "+ PORT);
});