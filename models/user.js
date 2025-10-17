import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
    },
     gender:{
        type:String,
        required:true
    },
     password: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
     otp: {
        type: String,
          default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
},
{
    timestamps:true
}
)
const usermodel = mongoose.model("user",userSchema)
export default usermodel