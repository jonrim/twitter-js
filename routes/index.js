module.exports = function (io) {
	var express = require('express');
	var router = express.Router();
	// could use one line instead: var router = require('express').Router();
	var tweetBank = require('../tweetBank');
	var bodyParser = require('body-parser');

	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var list = tweetBank.find(function(tweets) { return tweets.name === name; });
	  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, showForm: true } );
	});

	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: false }))

	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  
	  tweetBank.add(name, text);
	  io.sockets.emit('new_tweet', {name: name, text: text});
	  console.log(tweetBank.list());
	  res.redirect('/');
	});
	return router;
};