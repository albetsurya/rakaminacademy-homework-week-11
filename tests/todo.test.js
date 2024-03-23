const request = require("supertest");
const app = require("../app");
const { Todo } = require("../models");

describe("Todo Controller", () => {
  beforeAll(() => {
    return Todo.destroy({ where: {} })
      .then(() => Todo.create({ title: "Test Todo 1" }))
      .then(() => Todo.create({ title: "Test Todo 2" }));
  });

  describe("GET /todos", () => {
    it("should return all todos", (done) => {
      request(app)
        .get("/todos")
        .then((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe("GET /todos/:id", () => {
    it("should return a todo by ID", (done) => {
      Todo.findAll().then((todos) => {
        const todoId = todos[0].id;
        request(app)
          .get(`/todos/${todoId}`)
          .then((res) => {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("title");
            done();
          });
      });
    });

    it("should return 404 if todo is not found", (done) => {
      request(app)
        .get("/todos/999")
        .then((res) => {
          expect(res.statusCode).toEqual(404);
          done();
        });
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", (done) => {
      request(app)
        .post("/todos")
        .send({ title: "New Todo" })
        .then((res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body).toHaveProperty("title", "New Todo");
          done();
        });
    });

    it("should return 400 if title is missing", (done) => {
      request(app)
        .post("/todos")
        .send({})
        .then((res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update a todo", (done) => {
      Todo.findOne().then((todo) => {
        const todoId = todo.id;
        request(app)
          .put(`/todos/${todoId}`)
          .send({ title: "Updated Todo" })
          .then((res) => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("Todo updated successfully");
            done();
          })
          .catch((err) => done(err));
      });
    });

    it("should return 404 if todo is not found", (done) => {
      const nonExistentId = 999;
      request(app)
        .put(`/todos/${nonExistentId}`)
        .send({ title: "Updated Todo" })
        .then((res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toBe("Todo not found");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should soft delete a todo", (done) => {
      Todo.findOne().then((todo) => {
        const todoId = todo.id;
        request(app)
          .delete(`/todos/${todoId}`)
          .then((res) => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("Todo soft deleted");
            done();
          })
          .catch((err) => done(err));
      });
    });

    it("should return 404 if todo is not found", (done) => {
      const nonExistentId = 999;
      request(app)
        .delete(`/todos/${nonExistentId}`)
        .then((res) => {
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toBe("Todo not found");
          done();
        })
        .catch((err) => done(err));
    });
  });
});
