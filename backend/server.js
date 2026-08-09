import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

//error middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Success! App is running...");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`);
});
