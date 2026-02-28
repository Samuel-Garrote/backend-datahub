const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservas ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { fecha, hora } = req.body;
  if (!fecha || !hora)
    return res.status(400).json({ error: "Fecha and hora required" });
  try {
    const result = await pool.query(
      "INSERT INTO reservas (fecha, hora, user_id) VALUES ($1, $2, $3) RETURNING *",
      [fecha, hora, req.user.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM reservas WHERE id = $1", [req.params.id]);
    res.json({ message: "Reserva deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
