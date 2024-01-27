import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.route.js'
dotenv.config()
const app = express()
app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

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

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode  || 500
    const message = err.message  || 'Internal server error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})