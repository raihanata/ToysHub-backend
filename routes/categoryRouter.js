import { Router } from "express";
import { addCategory, deleteCategory, viewCategory } from "../controllers/categoryController.js";

const categoryRouter=Router()

categoryRouter.post("/add",addCategory)
categoryRouter.get("/view",viewCategory)
categoryRouter.delete("/delete",deleteCategory)



export default categoryRouter