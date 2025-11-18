import express from "express";
import { adminSignup, login } from "../controllers/authController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// First admin signup
router.post("/signup", adminSignup);

// Login (admin or user)
router.post("/login", login);

export default router;
