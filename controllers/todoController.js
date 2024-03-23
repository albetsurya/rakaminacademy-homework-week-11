const todoService = require("../services/todoService");

const todoController = {
  getAllTodos: async (req, res, next) => {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  getTodoById: async (req, res, next) => {
    try {
      const todo = await todoService.getTodoById(req.params.id);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ error: "Todo not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  createTodo: async (req, res, next) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const todo = await todoService.createTodo(title);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req, res, next) => {
    try {
      const { title } = req.body;
      const updatedTodo = await todoService.updateTodo(req.params.id, title);
console.log(updatedTodo)
      if (updatedTodo) {
        res.status(200).json({
          message: "Todo updated successfully",
          todo: updatedTodo,
        });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteTodo: async (req, res, next) => {
    try {
      const todoId = req.params.id;
      const deletedTodo = await todoService.softDeleteTodo(todoId);

      if (deletedTodo) {
        res.status(200).json({ message: "Todo soft deleted" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = todoController;
