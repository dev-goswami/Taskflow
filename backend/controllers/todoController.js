import Todo from "../models/todoModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
    const title = req.body.title;
    const user = req.user._id;

    const todo = await Todo.create({ title, user });

    return res.status(201).json(todo);
});

const getTodos = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const todos = await Todo.find({ user });

    return res.status(200).json(todos);
});

const getTodo = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id, user: req.user._id };

    const todo = await Todo.findOne(filter);

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    return res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id, user: req.user._id };
    const update = req.body;

    const updated = await Todo.findOneAndUpdate(filter, update, {
        new: true,
    });

    if (!updated) {
        return res.status(404);
        throw new Error("Todo not found");
    }

    return res.status(200).json(updated);
});

const deleteTodo = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id, user: req.user._id };

    const todo = await Todo.findOne(filter);

    if (!todo) {
        return res.status(404);
        throw new Error("Todo not found");
    }

    await todo.deleteOne();

    return res.status(200).json({
        message: "Todo deleted successfully",
    });
});

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
