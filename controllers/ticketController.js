const pool = require("../db");

exports.getTickets = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  try {
    const result = await pool.query(
      "INSERT INTO tickets (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await pool.query("DELETE FROM tickets WHERE id = $1", [req.params.id]);
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
