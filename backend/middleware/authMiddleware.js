import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

export const authHandle = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      if (!token) {
        res.status(401)
        throw new Error("chabi sara ghore dhuka jabe nah")
      }
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      res.status(401)
      throw new Error("key sara ghore dhuka jabe nah")
    }
  }
})
