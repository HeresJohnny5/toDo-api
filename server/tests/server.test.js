// LIBRARY IMPORTS
const expect = require('expect');
const request = require('supertest');

// LOCAL IMPORTS
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectId}  = require('mongodb');

// SEED DATA
const todos = [{
	_id: new ObjectId(),
	text: 'First test todo'
}, {
	_id: new ObjectId(),
	text: 'Second test todo', 
	completed: true,
	complatedAd: 333
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

describe('GET /todos/:id', () => {
	it('should return todo document', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`) // the .toHexString will convert an Object Id to a string
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	
	it('should return a 404 if todo not found', (done) => {
		request(app)
			.get('/todos/5a56cf81d1cb5189443748b9')
			.expect(404)
			.end(done);
	});
	
	it('should return a 404 for none object ids', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();
				
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			
				Todo.findById(hexId).then((todo) => {
					expect(todo).toBeNull();
					done();
				}).catch((err) => {
					done(err);
				});
			});
	});
	
	it('should return a 404 if todo not found', (done) => {
		request(app)
			.delete('/todos/5a56cf81d1cb5189443748b9')
			.expect(404)
			.end(done);
	});
	
	it('should return a 404 for none object ids', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'Hello World!';
		
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text,
				completed: true
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(typeof(res.body.todo.completedAt)).toEqual('number');
			})
			.end(done);
	});
	
	it('should clear completedAt when todo is not completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'Goodbye World!';
		
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text,
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeNull();
			})
			.end(done);
		});
});