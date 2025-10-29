import { Router } from "express";
import { deleteEmployee, getEmployees, login, updateEmployee } from "../controllers/authController.js";
import { register } from "../controllers/testController.js";
import verifyToken from "../middleware/authMiddleware.js";



const authRouter=Router()

authRouter.post("/login",login)


export default authRouter