import { genSalt } from "bcrypt"
import userModel from "../Model/userModel.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"
const signupHandler = async (req,res) => {
    const {password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt) 
        const user = await userModel.create({...req.body, password: hashedPassword})
        const result = {
            name: user.name,
            email: user.email,
            id: user._id
        }
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Unable to create user"
            })
        }
        return res.status(200).json({
            status: "success",
            message: "User created successfully",
            user: result
        })
    } catch (error) {
        console.log(error);
    }
}

const loginHandler = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email}).select("+password")
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User not found"
            })
        } 
        const match = await bcrypt.compare(password, user.password)
        if (match) {
           return res.status(404).json({
            status: "error",
            message: "Email or password is incorrect"
           })
        }
        const userToken = jwt.sign({userId: user.id, email: user.email},process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXP
        })
        return res.status(200).json({
            status: "success",
            message: "login successful",
            userToken
        })
    } catch (error) {
        console.log(error);
        
    }
}
export {signupHandler, loginHandler }