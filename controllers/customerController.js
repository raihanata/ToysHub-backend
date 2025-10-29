
import Customer from '../models/customer.js'

export const addCustomer = async(req,res)=>{

 try {
        const { customerName, customerPhone } = req.body;
        console.log("data", req.body);
       
        const newCustomer= new Customer({

            customerName,
            customerPhone,
          
        });

        const savedCustomer = await newCustomer.save();
        if (savedCustomer)
            return res.status(201).json({
                message: " successfully created new customer",
                status: true,
                data: savedCustomer
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
//get customer 


export const getCustomers = async (req, res) => {
  try {

    const {customerName,customerPhone}=req.query
    console.log(req.query,"data");
       const conditions = [];

    if (customerName)
      conditions.push({ customerName: { $regex: customerName, $options: "i" } });

    if (customerPhone)
      conditions.push({ customerPhone: { $regex: customerPhone, $options: "i" } });

    const query = conditions.length > 0 ? { $or: conditions } : {};

    const customers = await Customer.find(query);
    if(customers)
  return  res.status(200).json({ 
        message:"customer exists",
        status: true, 
        data: customers });
        
       res.status(404).json({
                status: false,
                message: "customer not found"
            });    
  } catch (error) {
    res.status(500).json({ 
        status: false, 
        message: "Error fetching customers" });
  }
};