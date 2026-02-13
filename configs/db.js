import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ DB connected successfully")
    } catch (error) {
        console.log("❌ DB connection error:", error.message)
        console.log("MongoDB URL:", process.env.MONGODB_URL ? "Set" : "Missing")
    }
}
export default connectDb