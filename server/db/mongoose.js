const mongoose = require('mongoose');
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

mongoose.Promise = global.Promise;

mongoose.connect(/*"mongodb://" + username + ":" + password + "@ds155577.mlab.com:55577/todoapp-nodejs" ||*/ 'mongodb://localhost:27017/TodoApp', {
	useMongoClient: true
});

module.exports = {
	mongoose
};