import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "add name"],
    },
    email: {
      type: String,
      required: [true, "add email"],
    },
    password: {
      type: String,
      required: [true, "add pass"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
