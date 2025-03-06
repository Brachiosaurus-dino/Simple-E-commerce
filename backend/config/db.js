import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose db connected"${connect.connection.host}`)
    } catch (error) {
        console.error(`Error${error.messege}`)
        process.exit(1)
    }
}