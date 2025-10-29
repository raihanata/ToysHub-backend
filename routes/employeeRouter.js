import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { deleteEmployee, getEmployees, register, searchEmployees, updateEmployee } from "../controllers/authController.js";



const employeeRouter=Router()

employeeRouter.use(verifyToken)

employeeRouter.post("/register",register)
employeeRouter.get("/get",getEmployees)
employeeRouter.patch("/update/:id",updateEmployee)
employeeRouter.delete("/delete",deleteEmployee)
employeeRouter.get("/search",searchEmployees)


export default employeeRouter