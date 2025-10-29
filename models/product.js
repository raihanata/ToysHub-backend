import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const productSchema = new mongoose.Schema({
     productId: {
        type: String,
      unique: true,
      default: uuidv4,
      
       

    },
   
    productName:{
        type:String,
        required:true
    },
     price:{
       type: Number,
        required:true
    },
     stockQuantity:{
       type: Number,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     image:{
        type:String,
       
    },
     category: {
       type: mongoose.Schema.Types.ObjectId, ref: 'category',
        
    },
     stockStatus:{
        type:String,
        enum:["In Stock","Out Of stock"],
        default:"Out Of stock"
    },
 
},
{
    timestamps:true
}
)
export default mongoose.model("product",productSchema)
