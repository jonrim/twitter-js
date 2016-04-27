var express = require('express'),
		swig = require('swig'),
		routes = require('./routes/'),
		bodyParser = require('body-parser'),
		socketio = require('socket.io');

var app = express();

// var locals = {
// 	title: 'An Example',
// 	people: [
// 		{ name: 'Gandalf' },
// 		{ name: 'Frodo' },
// 		{ name: 'Hermione' }
// 	]
// };





var server = app.listen(3000, function () {
	console.log("Server listening...");
});

var io = socketio.listen(server);

app.use('/', routes(io));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.use(express.static('public'));

// app.get('/stylesheets/style.css', function (req, res) {

// 	res.sendFile(__dirname + '/public/stylesheets/style.css');
// });

app.get('/', function (req, res) {
	//res.send("Welcome");
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people});
});