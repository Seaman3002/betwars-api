import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Bet Wars API is Live 🚀"));
app.use("/api/users", userRoutes);

// WebSocket Leaderboard Updates
io.on("connection", (socket) => {
  console.log("🔥 New client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
