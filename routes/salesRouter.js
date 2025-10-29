import { Router } from "express";
import { addSale, getSalesDetails } from "../controllers/salesController.js";
import verifyToken from "../middleware/authMiddleware.js";



const salesRouter=Router()
salesRouter.use(verifyToken)
salesRouter.post("/add",addSale)
salesRouter.get("/get",getSalesDetails)




export default salesRouter