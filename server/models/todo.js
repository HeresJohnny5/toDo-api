var mongoose = require('mongoose');

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

module.exports = {
	Todo
};