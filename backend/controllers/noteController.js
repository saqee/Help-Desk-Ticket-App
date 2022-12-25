import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Ticket from "../models/ticketModel.js"
import Note from "../models/notes.js"
export const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json({ notes })
})

export const createNotes = asyncHandler(async (req, res) => {
  const { text } = req.body

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const note = await Note.create({
    text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(200).json(note)
})
