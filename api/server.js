import express from 'express'
import cors from 'cors'
import makeConnection from './config/connection.js'
const PORT = process.env.PORT || 5000
import auth from './routes/auth.js'
const app=express()
app.use(express.json())
app.use(cors());

makeConnection();
app.use('/api',auth)
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})