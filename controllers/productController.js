import Product from "../models/product.js"
import Category from "../models/category.js"
import product from "../models/product.js";


//add product
export const AddProduct = async (req, res) => {

    try {
        const { productName, category, price, stockQuantity, description, stockStatus } = req.body;
        console.log("data", req.body);
        const image = req.file ? req.file.filename : null;
        const newProduct = new Product({

            productName,
            category,
            price,
            stockQuantity,
            description,
            stockStatus,
            image,
        });

        const savedProduct = await newProduct.save();
        if (savedProduct)
            return res.status(201).json({
                message: "product successfully added",
                status: true,
                data: savedProduct
            });

        return res.status(400).json(
            {
                error: " failed",
                status: false,
                data: null
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }

}

// GET all products
export const getProducts = async (req, res) => {

    try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1; // default page 1
        limit = parseInt(limit) || 5; // default 5 items per page
        const skip = (page - 1) * limit;
        const total = await Product.countDocuments();
        const products = await Product.find().populate("category", "name").skip(skip).limit(limit);
        const totalPages = Math.ceil(total / limit);
        if (products)

            return res.status(200).json({
                message: "product exists",
                status: true,
                data: products,
                totalPages,
                currentPage: page,
                totalItems: total
            });

        return res.status(400).json(
            {
                error: " product not found",
                status: false,
                data: null
            })

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};


// single product by Id
export const getProductById = async (req, res) => {
    const { id } = req.query
    console.log("id", req.query);

    try {
        const product = await Product.findById(id);
        // .populate("category")
        if (!product)
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        res.status(200).json({
            status: true,
            message: "",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};

//update
export const updateProduct = async (req, res) => {


    try {
        const { id } = req.query;
        console.log("id", req.query);

        if (!id) return res.status(400).json({
            status: false,
            message: "Product Id is required"
        });
        // Find existing product first
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }

        // Extract other fields from body
        const { productName, category, price, stockQuantity, description, stockStatus } = req.body;

        // Handle new image if uploaded
        let image = product.image; // keep old image if none uploaded
        if (req.file) {
            image = req.file.filename;
        }

        // Update fields
        product.productName = productName || product.productName;
        product.category = category || product.category;
        product.price = price || product.price;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.stockStatus = stockStatus || product.stockStatus;
        product.description = description || product.description;
        product.image = image;

        // Save updated product
        const updatedProduct = await product.save();

        if (!updatedProduct) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product successfully updated",
            status: true,
            data: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
};


// delete product
export const deleteProduct = async (req, res) => {

    const { id } = req.query
    console.log("id", req.query);

    try {
        const product = await Product.findById(id);
        if (!product)
            return res.status(404).json({
                status: false,
                message: "Product not found",
                data: null
            });
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server Error" });
    }
};
// GET /product/search?query=mouse
export const productSearch = async (req, res) => {
  try {
    const { productName } = req.query;
    console.log("Search query:", productName);

    const query = {};
    if (productName) {
      query.productName = { $regex: productName, $options: "i" };
    }

    const products = await Product.find(query);

    if (!products || products.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Products found",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};
