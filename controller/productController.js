// basically controller ni utk handle logic dalam routes
// routes hanya untuk locate URL je

//async handler
const asyncHandler = require('express-async-handler');


//import modules Product 
const Product = require('../models/productModel');

//POST Create a product
const createProductsController = asyncHandler( async (req, res) => {
    try {
        const product = await Product.create(req.body);      // Create a new product
        res.status(200).json(product);                      // Send back the created product as JSON
    } catch (error) {
        console.log(error);                                // Log the error to the console
        res.status(500);
        throw new Error(error.message);  // Respond with error message
    }
});

//GET Retrieve all products 
const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find({});            // Fetch all products
        res.status(200).json(products);                    // Respond with the list of products in JSON format
    } catch (error) {
        res.status(500);
        throw new Error(error.message); // Handle any errors
    }
};

//GET Retrieve a single product by ID
const getSingleProductController = asyncHandler(async (req,res) => {
    try{
        const {id} = req.params;
        const singleProduct = await Product.findById(id);
        res.status(200).json(singleProduct);
    } catch(error){
        res.status(500);
        throw new Error(error.message);
    }
});

//PUT Update a product by ID 
const updateProductController = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;                                      // Get the ID from the request parameters
        const product = await Product.findByIdAndUpdate(id, req.body);  // Update the product
        if (!product) {
            return res.status(404).json({ message: "Cannot find any product with ID" }); // Handle case where product is not found
        } else {
            const updatedProduct = await Product.findById(id);      // Fetch the updated product
            res.status(200).json(updatedProduct);                  // Respond with the updated product data
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message); // Handle any errors
    }
});

//DELETE Delete a product by ID
const deleteProductController = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;                                  // Get the ID from the request parameters
        const deleteProduct = await Product.findByIdAndDelete(id);  // Delete the product by ID
        if (!deleteProduct) {
            return res.status(404);
            throw new Error("Cannot find any ID to delete" ); // Handle case where product is not found
        } else {
            res.status(200).json(deleteProduct); // Respond with the deleted product data
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message); // Handle any errors
    }
});

//exports controller - getProducts
module.exports = {createProductsController, getAllProductsController, getSingleProductController, updateProductController, deleteProductController}