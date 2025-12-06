// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;


import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({ status: "ok-from-express" });
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];

   
    if (user.password_hash !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }


    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
});
