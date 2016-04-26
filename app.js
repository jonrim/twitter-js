var express = require('express'),
		swig = require('swig'),
		routes = require('./routes/'),
		bodyParser = require('body-parser');

var app = express();
app.use('/', routes);

var locals = {
	title: 'An Example',
	people: [
		{ name: 'Gandalf' },
		{ name: 'Frodo' },
		{ name: 'Hermione' }
	]
};


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



var server = app.listen(3000, function () {
	console.log("Server listening...");
});