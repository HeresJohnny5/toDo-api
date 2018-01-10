var mongoose = require('mongoose');

var User = mongoose.model('User', {
	email: {
		type: String,
		requied: true,
		minlength: 1,
		trim: true
	}
});

module.exports = {
	User
};