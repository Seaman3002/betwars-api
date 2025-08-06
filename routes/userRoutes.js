import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (Leaderboard)
router.get("/", async (_req, res) => {
  const users = await User.find().sort({ coins: -1 });
  res.json(users);
});

export default router;
