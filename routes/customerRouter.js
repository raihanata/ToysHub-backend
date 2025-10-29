import { Router } from "express";
import { addCustomer, getCustomers } from "../controllers/customerController.js";


const customerRouter=Router()

customerRouter.post("/add",addCustomer)

customerRouter.get("/get",getCustomers)



export default customerRouter