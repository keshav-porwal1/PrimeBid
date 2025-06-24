import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.put("/me/update", isAuthenticated, updateProfile); // Add this route
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);

export default router;