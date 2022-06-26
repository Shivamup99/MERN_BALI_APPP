import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../modals/user.js'

export const register = async(req,res)=>{
   const oldUser = await User.findOne({email:req.body.email})
   if(oldUser) return res.status(404).json({message:'user exists'})
   const salt = bcrypt.genSaltSync(10)
   const hashPassword = bcrypt.hashSync(req.body.password,salt)
   try {
       const user = new User({
           name:req.body.name,
           username:req.body.username,
           email:req.body.email,
           password:hashPassword,
       })
       let newUser = await user.save()
       const token =  jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
       res.status(201).json({newUser,token})
   } catch (error) {
       res.status(500).json({message:error.message})
   }
}

export const login = async(req,res)=>{
   const{email} = req.body
   try {
    let user = await User.findOne({email})
    if(!user) return res.status(404).json({message:"user doesn't exists"})
    const isValidPassword = bcrypt.compareSync(req.body.password,user.password)
    if(!isValidPassword) return res.status(403).json({message:"password not valid"})
    const token =  jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    const {password, ...otherDetails} = user._doc
    res.status(200).json({...otherDetails,token})
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}