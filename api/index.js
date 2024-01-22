import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()
const app = express()

app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
    res.send('Server started for Mikist Estate')
})

mongoose.connect(process.env.Mongo).then(()=>{
    console.log("Conneted to MongoDB!")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000!")
})