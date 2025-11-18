import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin can create users and see all users
router
  .route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

export default router;
