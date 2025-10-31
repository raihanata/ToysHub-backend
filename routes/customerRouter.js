import { Router } from "express";
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customerController.js";
import verifyToken from "../middleware/authMiddleware.js";


const customerRouter=Router()
customerRouter.use(verifyToken)

customerRouter.post("/add",addCustomer)

customerRouter.get("/get",getCustomers)
customerRouter.put("/update",updateCustomer)
customerRouter.delete("/delete",deleteCustomer)

export default customerRouter