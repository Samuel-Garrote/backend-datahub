const express = require ("express")
const router = express.Router()
import { getUsers, createUsers } from "../controllers/userControllers"

router.get("/", getUsers)
router.post("/", createUsers)

module.exports = router;