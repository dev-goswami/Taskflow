import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createTodo } from "../controllers/todoController.js";

const router = express.Router();

//user routes
router.post("/", protect, createTodo);

export default router;
