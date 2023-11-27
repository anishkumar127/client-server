import express from "express";
import { createTodo,GetAllTodo ,updateTodo,deleteTodo,SearchController,TodosPagination} from "../controllers/todo.controller.js";
const router = express.Router();

router.post("/todo", createTodo);
router.get("/todo",GetAllTodo);
router.put("/todo/:id",updateTodo);
router.delete("/todo/:id",deleteTodo);
router.get("/search",SearchController);
router.get("/pagination",TodosPagination)

export default router;
