import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import contactRoute from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5501",
    "https://portfolio-frontend-two-nu.vercel.app/"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/contact", contactRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});