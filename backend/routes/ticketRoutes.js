import express from "express"
import {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js"
import noteRouter from "./noteRoutes.js"
import { authHandle } from "../middleware/authMiddleware.js"
const router = express.Router()
router.use("/:ticketId/notes", noteRouter)
router.route("/").get(authHandle, getTickets).post(authHandle, createTickets)
router
  .route("/:id")
  .get(authHandle, getTicket)
  .delete(authHandle, deleteTicket)
  .put(authHandle, updateTicket)
export default router
