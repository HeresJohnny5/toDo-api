const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectId} = require('mongodb');

//Todo.remove({}).then((result) => {
//	console.log(result);
//});

//Todo.findOneAndRemove({ _id: '5a5d4870370d0ce58fd8ddc0' }).then(todo => {
//	console.log(todo);
//});

//Todo.findByIdAndRemove('5a5d4870370d0ce58fd8ddc0').then(todo => {
//	console.log(todo);
//});