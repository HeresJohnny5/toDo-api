const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
	email: {
		type: String,
		requied: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			isAsync: false,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email!'
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 1
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

module.exports = {
	User
};

// the unique property when set to true prevents two documents in the User collection with the same email