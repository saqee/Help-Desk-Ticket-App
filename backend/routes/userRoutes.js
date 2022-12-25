import express from "express"
import { register, login, getMe } from "../controllers/userController.js"
import { authHandle } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/me", authHandle, getMe)
export default router
