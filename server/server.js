// LIBRARY IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // body-parser allows you to send JSON to the server taking the string body  and turning it into a JavaScript object

// LOCAL IMPORTS
// ES6 Destructuring
// local variable mongoose equal to the mongoose property of the object returned via the file required 
const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const port = process.env.PORT || 3000; // this will be set if the app is running on Heroku or locally 

// MODELS
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// MIDDLEWEAR
app.use(bodyParser.json());

// ROUTES
// INDEX
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({
			todos
		});
	}, (err) => {
		res.status(400).send(err);
	});
});

// CREATE
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	
	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	})
});

// SHOW
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	};
	
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		
		res.send({
			todo
		});
	}).catch((err) => {
		res.status(404).send();
	})
});

// REMOVE
app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
		
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	};
	
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		
		res.send({
			todo
		});
	}).catch((err) => {
		res.status(404).send();
	})
});

app.listen(port, () => { 
	console.log(`Server has started on port ${port}.`); 
});

module.exports = {
	app
};