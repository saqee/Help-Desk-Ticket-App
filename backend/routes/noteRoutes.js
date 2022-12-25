import express from "express"
import { getNotes, createNotes } from "../controllers/noteController.js"
import { authHandle } from "../middleware/authMiddleware.js"
const router = express.Router({ mergeParams: true })

router.route("/").get(authHandle, getNotes).post(authHandle, createNotes)

export default router
