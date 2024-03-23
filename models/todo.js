// models/todo.js

"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Todo extends Model {}
  Todo.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Todo",
      paranoid: true,
    }
  );
  return Todo;
};
