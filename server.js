import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import connectDB  from "./config/connectDB.js"
connectDB()
const PORT = process.env.PORT || 4005
app.use(express.json())
app.listen(PORT, ()=>{
    console.log("App is running")
})
app.get("/api/v1", (req,res)=>{
    res.send("Welcome to SQI Flash card API version 1")
})



import userRouter from "./Router/authRouter.js"

app.use("/users", userRouter)