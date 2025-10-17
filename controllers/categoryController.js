import mongoose from 'mongoose'
import Category from '../models/category.js'

export const addCategory = async (req, res) => {

    try {

        const { name, categorydes } = req.body
        const categorydata = new Category({ name, categorydes })
        categorydata.save()
        if (!categorydata) {
            return res.status(400).json({
                error: " category registration failed",
                status: false,
                data: null
            })
        }
        res.status(200).json({
            message: "category registration successful",
            status: true,
            data: categorydata
        })
    } catch (error) {
        res.status(500).json({ error: "erroor" })
    }
}

export const viewCategory = async (req, res) => {

  try {
    const categories = await Category.find().sort({ createdAt: -1 });
   if (!categories) {
            return res.status(400).json({
                error: " category not found",
                status: false,
                data: null
            })
        }
         res.status(200).json({
            message: "categories found",
            status: true,
            data: categories
        })
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }

}
//delete category
export const deleteCategory = async (req, res) => {
  try {
    console.log(req.body)
    const {id}  = req.body;
    console.log("id", req.params);
    
    const catId = new mongoose.Types.ObjectId(id)
    const deletedCategory = await Category.findByIdAndDelete(catId);

    if (!deletedCategory)
         return res.status(404).json({
         message: "Category not found",
         status:false,
         data:null
         });

    res.status(200).json({
         message: "Category deleted successfully",
         data:deletedCategory,
         status:true
         });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error" });
  }
};