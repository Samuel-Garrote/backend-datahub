const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
