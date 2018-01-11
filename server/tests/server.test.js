// LIBRARY IMPORTS
const expect = require('expect');
const request = require('supertest');

// LOCAL IMPORTS
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// SEED DATA
const todos = [{
	text: 'First test todo'
}, {
	text: 'Second test todo'
}];

// TESTS
// beforeEach is a testing lifecycle method which will allow you to run some code before test cases are run
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	})
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
			
				Todo.find({text}).then((todos) => {
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
				expect(todos.length).toBe(2);
				done();
			}).catch((err) => {
				done(err);
			})
		})
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
		})
		.end(done);
	});
});