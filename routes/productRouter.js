import { Router } from "express";
import { AddProduct, deleteProduct, getProductById, getProducts, productSearch, updateProduct } from "../controllers/productController.js";
import { deleteCategory } from "../controllers/categoryController.js";
import multer from "multer";

const productRouter=Router()


// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder name
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

productRouter.post("/add",upload.single("image"),AddProduct)
productRouter.get("/get",getProducts)
productRouter.get("/getbyid",getProductById)
productRouter.patch("/update",upload.single("image"),updateProduct)
productRouter.delete("/delete",deleteProduct)
productRouter.get("/search",productSearch)

export default productRouter