const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;

console.log(username);
console.log(password);

mongoose.connect("mongodb://" + username + ":" + password + "@ds155577.mlab.com:55577/todoapp-nodejs" || 'mongodb://localhost:27017/TodoApp', {
	useMongoClient: true
});

module.exports = {
	mongoose
};