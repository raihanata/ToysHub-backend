import User from "../models/user.js"
import bcrypt from "bcryptjs"

export const register = async(req,res)=>
{
    try {

        const { firstname, lastname, password, email, gender, phone, place } = req.body

        const hashedPassword = await bcrypt.hash(password,10)
        const newuserdata = new User({firstname, lastname,   password: hashedPassword, email, gender, phone, place})
        newuserdata.save()
        if(!newuserdata){
            return res.status(400).json({error:"registration failed",status:false,data:null})
        }
        res.status(200).json({message:"registration successful",status:true,data:newuserdata})        
    } catch (error) {
        res.status(500).json({error:"erroor"})
    }
}