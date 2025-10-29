import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     categoryDescription:{
        type:String,
        required:true
    },   
},
{
    timestamps:true
}
)
const categorymodel = mongoose.model("category",categorySchema)
export default categorymodel