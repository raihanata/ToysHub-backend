import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({

    customerName:{
        type:String,

    },
    customerPhone:{
        type:String
    }

},
    {
        timestamps: true
    }
)
export default mongoose.model("customer",customerSchema)
