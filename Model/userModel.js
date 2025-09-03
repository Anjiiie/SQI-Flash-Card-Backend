import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: false
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
        select: false
    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel