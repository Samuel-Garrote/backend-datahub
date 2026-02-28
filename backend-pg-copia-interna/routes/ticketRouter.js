const express = require("express")
const router = express.Router();
import { getTickets, createTicket } from "../controllers/ticketController";

router.get("/", getTickets)
router.post("/", createTicket)

module.exports = router