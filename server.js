// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
	
	// models ========================
	var userSchema = mongoose.Schema({
			username: String,
			passwrd: String,
			about: String,
			hobbies: String
		});
	var User = mongoose.model('User', userSchema, 'users'); 
	var challengeSchema = mongoose.Schema({
			name: String,
			description: String,
			startDate: String,
			endDate: String,
			goal: Number,
			type: String,
			host: String, 
			enrolled: [
				{
					username: String,
					progress: Number
				}]
		});
	var Challenge = mongoose.model('Challenge', challengeSchema, 'challenges'); 
	
	var messageSchema = mongoose.Schema({
			data: String,
			readBy: [
				{userId: String}
			]
		});
	var Message = mongoose.model('Message', messageSchema, 'messages'); 
	
    // configuration =================
	console.log("connecting");
    mongoose.connect('mongodb://admin:admin123!@fitness.southcentralus.cloudapp.azure.com:27017/fitness', {useMongoClient: true});     // connect to mongoDB database
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		// we're connected!
		console.log("connected!"); 
		
		
		// listen (start app with node server.js) ======================================
		app.listen(8080);
		console.log("App listening on port 8080");
	});  
	
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // Allow cross-origin
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        console.log("CORS")
      next();
    });
			   
	// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all challenges
    app.get('/api/challenges', function(req, res) {

        // use mongoose to get all challenges in the database
        Challenge.find(function(err, challenges) {
			console.log((challenges)); 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(challenges); // return all challenges in JSON format
        });
    });
	
	// get all users
    app.get('/api/users', function(req, res) {
        // use mongoose to get all challenges in the database
        User.find(function(err, users) {
			console.log((users)); 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all challenges in JSON format
        });
    });

	// get all messages
    app.get('/api/messages', function(req, res) {
        // use mongoose to get all challenges in the database
        Message.find(function(err, messages) {
			console.log((messages)); 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(messages); // return all challenges in JSON format
        });
    });
	
    // create new challenge 
    app.post('/api/challenges', function(req, res) {
      
        // create a challenge, information comes from AJAX request from Angular
        Challenge.create({
            name : req.body.name,
			description: req.body.description,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			goal: req.body.goal,
			type: req.body.type,
			host: req.body.host, 
			enrolled: req.body.enrolled
        }, function(err, challenge) {
            if (err)
                res.send(err);
            res.send("success");
            // get and return all the challenges after you create another
            /*Challenge.find(function(err, challenges) {
                if (err)
                    res.send(err)
                res.json(challenges);
            });*/
        });

    });
	// create a new user
	app.post('/api/users', function(req, res) {
		console.log(req.body);
		console.log(req.body.username);
		console.log(req.body.passwrd);
		console.log(req.body.about);
		console.log(req.body.hobbies);
        // create a user, information comes from AJAX request from Angular
        User.create({
            username: req.body.username,
			passwrd: req.body.passwrd,
			about: req.body.about,
			hobbies: req.body.hobbies
        }, function(err, user) {
            if (err)
                res.send(err);   
            res.send("success");
            // get and return all the challenges after you create another
            /*
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
                console.log("2");
            });
            */
        });
    });
	// create a new message
	app.post('/api/messages', function(req, res) {
		console.log(req.body);
		console.log(req.body.data);
		//res.send("success");
        // create a user, information comes from AJAX request from Angular
        Message.create({
            data: req.body.data,
			readBy: [],
        }, function(err, message) {
            if (err)
                res.send(err);   
            res.send("success");
            // get and return all the challenges after you create another
            /*
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
                console.log("2");
            });
            */
        });
    });

	// join a challenge
    app.put('/api/joinChallenge', function(req, res) {
		var challengeName = req.body.name; 
		var username = req.body.username;
		console.log(username)
        console.log(challengeName)
        Challenge.update(
		{name : challengeName}, 
		{
			$push: {enrolled: {'username': username, 'progress': 0}}
			
		}, function(err, challenge) {
            if (err)
                res.send(err);
			res.send("success");
        });
    });
	
	// withdraw from challenge
    app.put('/api/withdrawFromChallenge', function(req, res) {
		var challengeName = req.body.name; 
		var username = req.body.username;
		
        Challenge.update(
		{name : challengeName}, 
		{
			$pull: {enrolled: {'username': username}}
			
		}, function(err, challenge) {
            if (err)
                res.send(err);
			res.send("success");
        });
    });

    // update progress within a challenge
    app.put('/api/updateChallenge', function(req, res) {
		var challengeName = req.body.name; 
		var username = req.body.username;
        var progress = req.body.progress;
		console.log(username)
        console.log(challengeName)
        Challenge.update(
		{name : challengeName, 'enrolled.username': username}, 
		{
			'$set': {'enrolled.$.progress': progress}	
		}, function(err, challenge) {
            console.log("1")
            if (err){
                console.log("2")
                console.log(err)
                res.send(err); 
            }
            console.log("3")
			res.send("success");
        });
    });
	
    // delete a challenge by name
    app.delete('/api/challenges/:name', function(req, res) {
        Challenge.remove({
            name : req.params.name
        }, function(err, challenge) {
            if (err)
                res.send(err);
			res.send("success");
        });
    });
	
	// delete a user by username
    app.delete('/api/users/:username', function(req, res) {
        User.remove({
            username : req.params.username
        }, function(err, user) {
            if (err)
                res.send(err);
			res.send("success");
        });
    });
	
	// delete a message by data
    app.delete('/api/messages/:message_data', function(req, res) {
        Message.remove({
            data : req.params.message_data
        }, function(err, message) {
            if (err)
                res.send(err);
			res.send("success");
        });
    });
	
	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
		console.log("Received request for index");
    });
	