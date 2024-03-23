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
        throw new Error("Todo not found");
      } else {
        await todo.update({ title });
        return todo;
      }
    } catch (error) {
      throw new Error("Failed to update todo in database");
    }
  },

  softDeleteTodo: async (id) => {
    try {
      const todo = await Todo.findByPk(id);
      if (!todo) {
        throw new Error("Todo not found");
      } else {
        await todo.destroy(id);
        return todo;
      }
    } catch (error) {
      throw new Error("Failed to soft delete todo in database");
    }
  },
};

module.exports = todoRepository;
