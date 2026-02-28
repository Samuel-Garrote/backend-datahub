// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

// GET / - prueba
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ message: "Backend funcionando 💪", users: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users - crear usuario
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`),
);
