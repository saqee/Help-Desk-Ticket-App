import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("please fill the body")
  }

  //user exits
  const userExits = await User.findOne({ email })
  if (userExits) {
    res.status(400)
    throw new Error("user already boshe ache")
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("invalid data")
  }
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("invalid data")
  }
})

export const getMe = asyncHandler(async (req, res) => {
  const { name, email, id } = req.user
  return res.status(200).json({ name, email, id })
})

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}
