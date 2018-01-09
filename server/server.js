const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', {
	useMongoClient: true
});

// MODELS
var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1, // this will prevent the user from entering a empty string
		trim: true // this will eliminate leading / trailing whitespace
	},
	completed: {
		type: Boolean,
		default: false
	}, 
	completedAt: {
		type: Number,
		default: null
	}
});

var User = mongoose.model('User', {
	email: {
		type: String,
		requied: true,
		minlength: 1,
		trim: true
	}
});

// CREATE
var newUser = new User({
	email: 'johnerickson@example.com'
});

//var newTodo = new Todo({
//	text: 'Learn NodeJS',
//	completed: true,
//	completedAt: 010818
//});
	
// SAVE
newUser.save().then((doc) => {
	console.log(`Saved user: ${newUser}.`);
}, (err) => {
	console.log(`Unable to save user.`);
})

//newTodo.save().then((doc) => {
//	console.log(`Saved todo: ${doc}.`);
//}, (err) => {
//	console.log(`Unable to save todo.`);
//})