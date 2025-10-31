import Customer from "../models/customer.js"
import Product from "../models/product.js"
import Sales from "../models/sales.js"

export const GetTopStatitics = async(req,res)=>{

 try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await Sales.aggregate([
      {
        $facet: {
          //  Total Revenue
         totalRevenue: [
            {
              $group: {
                _id: null,
                total: { $sum: "$amount.totalAmount" }
              }
            }
          ],

          //  Today's Sales Count
          todaysSales: [
            { $match: { saleDate: { $gte: today } } },
            { $count: "count" }
          ]
        }
      }
    ]);

    //  Separate queries for customers and products
    const totalCustomers = await Customer.countDocuments();
    const totalProducts = await Product.countDocuments();

    //  Extract data safely
    const result = {
      totalCustomers,
      totalProducts,
      totalRevenue: stats[0]?.totalRevenue[0]?.total || 0,
      todaysSales: stats[0]?.todaysSales[0]?.count || 0,
    };

    res.status(200).json({
         message: "successfull",
         status: true,
          data: result });
  } catch (error) {
    console.error("Error in dashboard stats:", error);
    res.status(500).json({
         status: false,
          message: "Server Error" });
  }


}