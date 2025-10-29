import Sales from '../models/sales.js'
import Customer from '../models/customer.js'

export const addSale = async(req,res)=>{

 try {
    console.log("Employee ID from token:", req.userId);

         const employeeId = req.userId
         
        const { customerId,saleDate,paymentMethod,products,amount } = req.body;
        console.log("data", req.body);
       
        const newsale= new Sales({ customerId, employeeId,saleDate,paymentMethod,products,amount});

        const savedSale = await newsale.save();
        if (savedSale)
            return res.status(201).json({
                message: " successfully added",
                status: true,
                data: savedSale
            });

        return res.status(400).json(
            {
                error: " failed",
                status: false,
                data: null
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }

}

// Get all sales
export const getSalesDetails = async (req, res) => {

    try {
      
        const salesData = await Sales.find()
 .populate("customerId", "customerName")
.populate("products.productId", "productName price")

  .sort({ saleDate: -1 });

       
        if (salesData)

            return res.status(200).json({
                message: "sales data exists",
                status: true,
                data: salesData,
                
            });

        return res.status(400).json(
            {
                error: " sales data not found",
                status: false,
                data: null
            })

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};
