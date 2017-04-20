    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost:27017/todo');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    
	//define model================
	
	var Todo = mongoose.model('Todo', {
		 name : String,
		 todo : String,
		 

	});
	
	// routes ======================================================================
       var Todo = require('./models/todo');
       module.exports = function(app) {
		   
		   
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json({
				count: Object.keys(todos).length,
				todos: todos
			}); // return all todos in JSON format
        });
	}); 
}
	/*app.get('/api/todos/count', function(req, res) {
		Todo.aggregate([{"$group" : {_id:"$name", count:{$sum:1}}}],
		function(err, count) {
			if (err)
                res.send(err);

			res.json(count);
		});
	});
	*/
	
	
	 // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            name : req.body.name,
            todo : req.body.todo,
			done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });
	
	// delete all Todo of 1 person
    app.delete('/api/todos/:name', function(req, res) {
        Todo.remove({
           name : req.params.name
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
	//delete one Todo
	app.delete('/api/todo/:id', function(req, res) {
	    Todo.remove({
           _id : req.params.id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
	
	
	
	
	//delete all Todos of all person
	app.delete('/api/alltodo/', function(req, res) {
	
	
        Todo.remove( function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
 	
	
	// application -------------------------------------------------------------
    app.get('', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
