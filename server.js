import express from "express";
import cors from "cors";
import dotenv from "dotenv";       // ✅ Import dotenv
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profileRoutes.js";

// 1️⃣ Load environment variables
dotenv.config();

const app = express();
app.use(cors({
  origin: "https://me-api-frontend-nyu4.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you send cookies/auth
}));
app.use(express.json());

// 2️⃣ Connect to MongoDB
connectDB();

// 3️⃣ Use the routes
app.use("/api/profile", profileRoutes);

// 4️⃣ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
