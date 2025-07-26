import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();

const allowedOrigins = [
  "https://brandandbrandz.com",
  "http://localhost:3000",
  "http://localhost:8081",
  "http://10.36.242.224",
  "http://192.168.163.86",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", contactRouter);

const PORT = process.env.PORT || 8080;

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  testConnection();
});
