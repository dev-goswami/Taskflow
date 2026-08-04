import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Success! App is running...");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
