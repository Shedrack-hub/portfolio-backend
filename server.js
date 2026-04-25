import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import contactRoute from "./routes/contact.js";

dotenv.config();

const app = express();

// Security
app.use(helmet());

// CORS (PRODUCTION FIXED)
app.use(cors({
  origin: [
    "https://portfolio-frontend-two-nu.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/contact", contactRoute);

// Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});