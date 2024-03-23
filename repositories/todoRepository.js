const { Todo } = require("../models");

const todoRepository = {
  getAllTodos: async () => {
    try {
      const todos = await Todo.findAll({
        where: {
          deletedAt: null,
        },
      });
      return todos;
    } catch (error) {
      throw new Error("Failed to fetch todos from database");
    }
  },

  getTodoById: async (id) => {
    try {
      const todo = await Todo.findByPk(id);
      return todo;
    } catch (error) {
      throw new Error("Failed to fetch todo from database");
    }
  },

  createTodo: async (title) => {
    try {
      const todo = await Todo.create({ title });
      return todo;
    } catch (error) {
      throw new Error("Failed to create todo in database");
    }
  },

  updateTodo: async (id, title) => {
    try {
      const todo = await Todo.findByPk(id);
      if (!todo) {
        const error = new Error("Todo not found");
        error.statusCode = 404;
        throw error;
      } else {
        await todo.update({ title });
        return todo;
      }
    } catch (error) {
      if (error.statusCode) {
        throw error;
      } else {
        throw new Error("Failed to update todo in database: " + error.message);
      }
    }
  },

 softDeleteTodo: async (id) => {
    try {
      const todo = await Todo.findByPk(id);
      if (!todo) {
        const error = new Error("Todo not found");
        error.statusCode = 404;
        throw error;
      } else {
        await todo.destroy();
        return todo;
      }
    } catch (error) {
      if (error.statusCode) {
        throw error;
      } else {
        const errorMessage = "Failed to soft delete todo in database";
        throw new Error(errorMessage);
      }
    }
  },
};

module.exports = todoRepository;
