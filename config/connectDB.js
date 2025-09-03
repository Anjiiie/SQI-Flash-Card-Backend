import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL;
const connectDB = async () => {
    console.log("Mongodb is loading");
    try {
        const connected = await mongoose.connect(MONGODB_URL)
        if (connected) {
            console.log("Mongodb is connected");
        }
    } catch (error) {
        console.log(error);
        
    }
}
export default connectDB