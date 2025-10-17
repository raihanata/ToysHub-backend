import { Router } from "express";
import { register } from "../controllers/testController.js";


const testRouter = Router()

testRouter.post("/register",register)


export default testRouter