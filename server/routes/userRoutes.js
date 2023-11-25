import express from "express";
import { UserLogin, UserSignUp } from "../controllers/login.controller.js";
const router = express.Router();

router.post("/login", UserLogin);
router.post("/signup", UserSignUp);
export default router;
