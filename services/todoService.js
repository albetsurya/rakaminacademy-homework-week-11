const todoRepository = require("../repositories/todoRepository");

const todoService = {
  getAllTodos: async () => {
    try {
      const todos = await todoRepository.getAllTodos();
      return todos;
    } catch (error) {
      throw new Error("Failed to fetch todos");
    }
  },

  getTodoById: async (id) => {
    try {
      const todo = await todoRepository.getTodoById(id);
      return todo;
    } catch (error) {
      throw new Error("Failed to fetch todo");
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
      throw new Error("Failed to update todo");
    }
  },

  softDeleteTodo: async (id) => {
    try {
      const todo = await todoRepository.softDeleteTodo(id);
      return todo;
    } catch (error) {
      throw new Error("Failed to soft delete todo");
    }
  },
};

module.exports = todoService;
