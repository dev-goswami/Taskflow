import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

//user routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
