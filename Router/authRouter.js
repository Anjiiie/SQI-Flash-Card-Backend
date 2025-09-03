import express from "express"
import {signupHandler, loginHandler} from "../Controller/authController.js"
const userRouter = express.Router()
userRouter.post("/signup", signupHandler)
userRouter.post("/login", loginHandler)

export default userRouter