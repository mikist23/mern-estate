import express from 'express'

const app = express()
app.get((req,res)=>{
    res.send('Server started for Mikist Estate')
})
app.listen(3000, ()=>{
    console.log("Server running on port 3000!")
})