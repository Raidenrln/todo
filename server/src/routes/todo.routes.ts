import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.get("/", getTodos);
router.post("/test", createTodo);
router.put("/:id", updateTodo);

export default router;