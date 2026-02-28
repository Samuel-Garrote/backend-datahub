const { prisma } = require("../prisma/prisma.config.js");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All inputs must be filled" });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.json({ name: newUser.name, email: newUser.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
