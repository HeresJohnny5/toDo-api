//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	} 
	
	console.log('Connected to MongoDB sever.');
	
	db.collection('Users').findOneAndDelete({
		name: 'John'
	}).then((result) => {
		console.log(result);
	})
	
//	db.close();
});