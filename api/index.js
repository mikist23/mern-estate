import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.get((req,res)=>{
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