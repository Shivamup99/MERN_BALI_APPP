import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const url = process.env.MONGO_URL;

const makeConnection = async()=>{
    try {
        await mongoose.connect(url)
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}

export default makeConnection; 