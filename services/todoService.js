const todoRepository = require("../repositories/todoRepository");

const todoService = {
  getAllTodos: async () => {
    try {
      const todos = await todoRepository.getAllTodos();
      return todos;
    } catch (error) {
      if (error.message && error.message.includes("Database connection")) {
        throw new Error("Failed to connect to database");
      } else {
        throw new Error("Failed to fetch todos");
      }
    }
  },

  getTodoById: async (id) => {
    try {
      const todo = await todoRepository.getTodoById(id);
      return todo;
    } catch (error) {
      if (error.message && error.message.includes("Todo not found")) {
        throw new Error(`Todo with ID ${id} not found`);
      } else {
        throw new Error("Failed to fetch todo");
      }
    }
  },

  createTodo: async (title) => {
    try {
      const todo = await todoRepository.createTodo(title);
      return todo;
    } catch (error) {
      throw new Error("Failed to create todo");
    }
  },

  updateTodo: async (id, title) => {
    try {
      const todo = await todoRepository.updateTodo(id, title);
      return todo;
    } catch (error) {
      if (error.message && error.message.includes("Todo not found")) {
      } else {
        throw error;
      }
    }
  },

  softDeleteTodo: async (id) => {
    try {
      const todo = await todoRepository.getTodoById(id);
      return todo;
    } catch (error) {
      if (error.message && error.message.includes("Todo not found")) {
        throw new Error(`Todo with ID ${id} not found`);
      } else {
        throw error;
      }
    }
  },
};

module.exports = todoService;
