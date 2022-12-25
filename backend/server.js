import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import ticketRoutes from "./routes/ticketRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import { connectDb } from "./config/db.js"
import cors from "cors"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
connectDb()
app.use(express.urlencoded({ extended: false }))
app.use("/api/users", userRoutes)
app.use("/api/tickets", ticketRoutes)

app.use(errorHandler)
app.listen(process.env.PORT || 5003, () => {
  console.log("server" + process.env.PORT)
})
