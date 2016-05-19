var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});
	
	
	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});
	
	// UPDATE TASK AS COMPLETED
	app.put('/api/todos/:todo_id', function(req, res) {
		console.log('Updating todo task');
		
		Todo.update(
			{ _id: req.params.todo_id },
			{ $set:
				{
				  "completed": true
				}
			}
		)
	}, function(error, todo) {
		if (error) { res.send(error); }
		
		Todo.find(function(error, todos) {
			if (error) { res.send(error) }
			res.json(todos);
		});
	});

	// DELETE IMPLEMENTATION HERE
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(error, todo) {
			if (error) { res.send(error); }
			
			Todo.find(function(error, todos) {
				if (error) { res.send(error) }
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
