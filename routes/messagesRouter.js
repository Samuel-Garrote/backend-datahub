const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });
  try {
    const result = await pool.query(
      "INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *",
      [content, req.user.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [req.params.id]);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
