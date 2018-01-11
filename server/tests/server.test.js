// LIBRARY IMPORTS
const expect = require('expect');
const request = require('supertest');

// LOCAL IMPORTS
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// TESTS
// beforeEach is a testing lifecycle method which will allow you to run some code before test cases are run
beforeEach((done) => {
	Todo.remove({}).then(() => {
		done();
	});
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';
		
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text); 
			})
			.end((err, res) => {
				if (err) {
					return done(err); // the done method will end the code printing the result
				}
			
				Todo.find().then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((err) => {
					done(err);
				})
			})
	});
	
	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			
			Todo.find().then((todos) => {
				expect(todos.length).toBe(0);
				done();
			}).catch((err) => {
				done(err);
			})
		})
	});
});