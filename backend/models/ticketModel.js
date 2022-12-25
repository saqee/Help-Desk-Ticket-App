import mongoose from "mongoose"

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "select a product"],
      enum: ["iPhone", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "add description"],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
)

const Ticket = mongoose.model("Ticket", ticketSchema)
export default Ticket
