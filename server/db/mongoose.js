const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log(username);
console.log(password);

mongoose.connect("mongodb://" + username + ":" + password + "@ds155577.mlab.com:55577/todoapp-nodejs" || 'mongodb://localhost:27017/TodoApp', {
	useMongoClient: true
});

module.exports = {
	mongoose
};