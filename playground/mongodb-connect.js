//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	} 
	
	console.log('Connected to MongoDB sever.');
	
// db.collection only has one argument which is a string name for the collection you want to insert into the database
// method .insertOne lets you insert a new document into your collection
//	db.collection('Todos').insertOne({ 
//		text: 'Something to do',
//		completed: false
//	}, (err, res) => {
//		if (err) {
//			return console.log(`Unable to insert todo: ${err}.`);
//		}
//		
//		// method .ops will store all of the docs that were inserted in an array
//		console.log(JSON.stringify(res.ops, undefined, 2));
//	});
	
//	db.collection('Users').insertOne({
//		name: 'Lena',
//		age: 33,
//		location: 'Portland'
//	}, (err, res) => {
//		if (err) {
//			return console.log(`Unable to insert user: ${err}.`);
//		}
//		
//		console.log(JSON.stringify(res.ops, undefined, 2));
//	});
	
	db.collection('Users').insertMany([
		{
			name: 'John',
			age: 39,
			location: 'Pittsburgh'
		},
		{
			name: 'Nacho',
			age: 9,
			location: 'Portland'
		}
	], (err, res) => {
		if (err) {
			return console.log(`Unable to insert user: ${err}.`);
		}
		
		console.log(JSON.stringify(res.ops, undefined, 2));
	});
	
	db.close();
});