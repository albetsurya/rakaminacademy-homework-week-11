const todoService = require("../services/todoService");

const todoController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const todo = await todoService.getTodoById(req.params.id);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ error: "Todo not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const todo = await todoService.createTodo(title);
      res.status(201).json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await todoService.updateTodo(req.params.id, title);
      res.json({ message: "Todo updated successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await todoService.softDeleteTodo(req.params.id);
      res.json({ message: "Todo soft deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = todoController;
