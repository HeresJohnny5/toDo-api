//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	} 
	
	console.log('Connected to MongoDB sever.');
	
//	db.collection('Todos').findOneAndUpdate({ 
//		_id: new ObjectID('5a521c2aeee31d8569e5bd0e')
//	}, {
//		$set: { 
//			completed: true 
//		}
//	}, {
//		returnOriginal: false
//	}).then((result) => {
//		console.log(result);
//	});
	
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5a511dec3e23e330a1953733')
	}, {
		$set: {
			name: 'Pook'
		},
		$inc: {
			age: +1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})
	
//	db.close();
});