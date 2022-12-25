import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Ticket from "../models/ticketModel.js"

export const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("no user found")
  }
  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json({ tickets })
})

export const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("no user found")
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(401)
    throw new Error("no ticket")
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("not authrized")
  }
  return res.status(200).json(ticket)
})

export const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("no user found")
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(401)
    throw new Error("no ticket")
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("not authrized")
  }
  await ticket.remove()
  res.status(201).json({ success: true })
})

export const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("no user found")
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(401)
    throw new Error("no ticket")
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("not authrized")
  }
  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  return res.status(201).json({ updateTicket })
})

export const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error("Please add a product and description")
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  })

  return res.status(201).json({ ticket })
})
