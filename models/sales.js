import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Types.ObjectId,
           ref: "customer",
        default:null
    },
    employeeId: {
        type: mongoose.Types.ObjectId, ref: 'user'
    },
    saleDate: {
        type: Date,
    default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", 'Card', 'UPI'], default: "Cash"
    },
    products: [{
        productId:{type:mongoose.Types.ObjectId, ref: 'product'},
        quantity:Number,
        price:Number,
        total: Number
    },

    ],
    amount:
        {
            subtotal:Number,
            discount: Number,
            tax:Number,
            totalAmount: Number
        }
    
},
    {
        timestamps: true
    }
)
export default mongoose.model("sale", salesSchema)
