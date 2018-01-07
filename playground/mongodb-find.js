//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	} 
	
	console.log('Connected to MongoDB sever.');
	
// calling method .find is only the first step. The .find method returns a Mongo DB cursor, which is not the actual document itself
// the method .toArray returns a promise
//	db.collection('Todos').find({
//		_id: new ObjectID('5a5185b07e94bb433e43a69a')
//	}).toArray().then((docs) => {
//		console.log('Todos:');
//		console.log(JSON.stringify(docs, undefined, 2));
//	}, (err) => {
//		console.log(`Unable to fetch todos: ${err}.`);
//	});
	
//	db.collection('Todos').find().count().then((count) => {
//		console.log(`Todos count: ${count}.`);
//	}, (err) => {
//		console.log(`Unable to fetch todos: ${err}.`);
//	});
	
//	db.collection('Users').find({
//		name: 'Lena'
//	}).toArray().then((docs) => {
//		console.log('Users:');
//		console.log(JSON.stringify(docs, undefined, 2));
//	}, (err) => {
//		console.log(`Unable to fetch users: ${err}.`);
//	});
	
//	db.close();
});