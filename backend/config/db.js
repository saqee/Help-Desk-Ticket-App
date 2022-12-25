import mongoose from "mongoose"
export const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true)
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log("db connect")
  } catch (error) {
    console.log(error)
  }
}
