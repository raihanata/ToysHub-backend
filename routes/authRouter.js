import { Router } from "express";
import { login } from "../controllers/authController.js";
import { register } from "../controllers/testController.js";



const authRouter=Router()

authRouter.post("/login",login)
authRouter.post("/register",register)



export default authRouter