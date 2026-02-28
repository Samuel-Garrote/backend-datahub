const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getTickets = async (req, res) => {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
};

exports.createTicket = async (req, res) => {
    const { title, description } = req.body;

    try {
    const ticket = await prisma.ticket.create({
        data: { title, description },
    });

    res.json(ticket);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
};
