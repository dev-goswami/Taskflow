import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

//user routes
router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.get("/:id", protect, getTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

export default router;
