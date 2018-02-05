const mongoose = require('mongoose');
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// "mongodb://" + username + ":" + password + "@ds155577.mlab.com:55577/todoapp-nodejs"

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://" + username + ":" + password + "@ds155577.mlab.com:55577/todoapp-nodejs" || process.env.MONGODB_URI, {
	useMongoClient: true
});

module.exports = {
	mongoose
};