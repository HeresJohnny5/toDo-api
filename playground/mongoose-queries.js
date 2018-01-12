const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectId} = require('mongodb');

// todo id
//var id = '6a56cf81d1cb5189443748b2';

// method isValid returns true if the id is valid and false if it is not
//if (!ObjectId.isValid(id)) {
//	console.log(`Id not valid.`);
//};

// method .find allows you to query as many documents as you like
// passing in no arguments will return all your documents inside an array
//Todo.find({
//	_id: id
//}).then((todos) => {
//	console.log(`Todos: ${todos}.`);
//});
//
// method .findOne only returns one document, grabbing the first one that matches the query
//Todo.findOne({
//	_id: id
//}).then((todo) => {
//	console.log(`Todo: ${todo}.`);
//});

// method .findById is a fantastic option if you're just looking for a document by it's identifier
//Todo.findById(id).then((todo) => {
//	if (!todo) {
//		return console.log(`Id not found.`);	
//	}
//	
//	console.log(`Todo by Id: ${todo}.`)
//}).catch((err) => {
//	console.log(err);
//});

// user id
var id = '5a542dd4ff56ee1879c6bb60';

if (!ObjectId.isValid(id)) {
	console.log(`Id not valid.`);
};

User.findById(id).then((user) => {
	if (!user) {
		return console.log(`User not found.`);
	}
	
	console.log(JSON.stringify(user, undefined, 2));
}).catch((err) => {
	console.log(err)
});