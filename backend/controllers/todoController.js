import Todo from "../models/todoModel.js";

const createTodo = async (req, res) => {
  const title = req.body.title;

  const todo = await Todo.create({ title, user: req.user._id });

  return res.status(201).json(todo);
};

export { createTodo };
