import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt  from "bcryptjs"


export const login = async(req,res)=>{

try {
     const {email,password}=req.body
    const userData = await User.findOne({email})

    if(!userData){
        return res.status(400).json(
            {error:"authenication failed",
                status:false,
                data:null
            })
    }
    const passwordMatch = await  bcrypt.compare(password,userData.password)

    if(!passwordMatch){
        return res.status(400).json({
            error:"Password authentication failed",
            status:false,
            data:null
        })
    }
    const token = jwt.sign(
        {UserId:userData._id},
        process.env.JWT_TOKEN,
        {expiresIn:"30d"}
    )
    res.status(200).json({
        message:"login sucessful",
        status:true,
        data:userData,
        token
    })

} catch (error) {
    res.status(500).json(
        {
            error:"login failed"
        }
    )
}

}