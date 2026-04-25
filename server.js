import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import helmet from "helmet";

import contactRoute from "./routes/contact.js";

const app = express();

// security headers
app.use(helmet());

// JSON parser
app.use(express.json());

// CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://127.0.0.1:5501",  // Your current frontend
      "http://localhost:5501",
      "http://localhost:5173",
      "http://localhost:3000"
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// routes
app.use("/api/contact", contactRoute);

// PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});