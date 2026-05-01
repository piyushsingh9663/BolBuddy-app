import express from "express";
import { register,login,deleteMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.delete("/me",protect,deleteMe);
export default router;