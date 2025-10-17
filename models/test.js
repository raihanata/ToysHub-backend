import mongoose from "mongoose";
const testSchema = new mongoose.Schema({
   
     email:{
        type:String,
        required:true
    },
     
     password: {
        type: String,
        required: true
    },
    
}
)
const testmodel = mongoose.model("test",testSchema)
export default testmodel