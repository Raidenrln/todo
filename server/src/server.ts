import express from "express";
import cors from "cors";
import "dotenv/config";
import { logger } from "./middleware/logger.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes); 
app.use("/todo", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});