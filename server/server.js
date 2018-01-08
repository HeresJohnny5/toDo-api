const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', {
	useMongoClient: true
});

// MODELS
var Todo = mongoose.model('Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	}, 
	completedAt: {
		type: Number
	}
});

// CREATE
var newTodo = new Todo({
	text: 'Play Mario Kart with Lena',
	completed: true,
	completedAt: 111
});
	
// SAVE
newTodo.save().then((doc) => {
	console.log(`Saved todo: ${doc}.`);
}, (err) => {
	console.log(`Unable to save todo.`);
})