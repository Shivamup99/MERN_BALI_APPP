import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    isAdmin:{
        type :Boolean,
        default:false
    }
},{timestamps:true})

const userSchema = mongoose.model('User',createUserSchema)
export default userSchema;