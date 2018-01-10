// LIBRARY IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // body-parser allows you to send JSON to the server taking the string body  and turning it into a JavaScript object

// LOCAL IMPORTS
// ES6 Destructuring
// local variable mongoose equal to the mongoose property of the object returned via the file required 
var {mongoose} = require('./db/mongoose');

// MODELS
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// MIDDLEWEAR
app.use(bodyParser.json());

// ROUTES
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

app.listen('3000', () => { 
	console.log(`Server has started on port 3000.`); 
});