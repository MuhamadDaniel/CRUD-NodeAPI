// 1. Import Required Libraries
const express = require('express');
const mongoose = require('mongoose');

const { format } = require('date-fns');
console.log(format(new Date(), 'yyyy MM dd\tHH:mm:ss'));

// Import the Product model
const Product = require('./models/productModel');

// 2. Create an Express Application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// 3. Define the Port
const port = process.env.PORT || 3001;

// 4. Define the MongoDB Connection String
const database = "mongodb+srv://userDaniell:userDaniel1918@databasenode.zneyr.mongodb.net/CRUD-Node?retryWrites=true&w=majority&appName=DatabaseNode";

// 5. Connect to MongoDB
mongoose.connect(database)
.then(() => {
    console.log("Database Connected Successfully!");
    
    // 6. Start the Express Server after a successful database connection
    app.listen(port, () => {
        console.log("Server is running on port: " + port);
    });
})
.catch((error) => {
    console.error("Database connection error:", error);
});

// 7. Define Routes

// GET request for the root route
app.get('/', (req, res) => {
    res.send("Hello CRUD"); // Respond with a welcome message
});

// GET request for the About page
app.get('/About', (req, res) => {
    res.send("This is about page"); // Respond with about page message
});

// POST request to create a new product and insert it into the database
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);      // Create a new product
        res.status(200).json(product);                      // Send back the created product as JSON
    } catch (error) {
        console.log(error);                                // Log the error to the console
        res.status(500).json({ message: error.message }); // Respond with error message
    }
});

// GET request to retrieve all products from the database
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});            // Fetch all products
        res.status(200).json(products);                    // Respond with the list of products in JSON format
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// GET request to retrieve a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;                   // Get the ID from the request parameters
        const product = await Product.findById(id); // Find the product by ID
        res.status(200).json(product);              // Respond with the product data
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// PUT request to update an existing product by ID
app.put('/products/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// DELETE request to delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;                                  // Get the ID from the request parameters
        const deleteProduct = await Product.findByIdAndDelete(id);  // Delete the product by ID
        if (!deleteProduct) {
            return res.status(404).json({ message: "Cannot find any ID to delete" }); // Handle case where product is not found
        } else {
            res.status(200).json(deleteProduct); // Respond with the deleted product data
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// Comments: 
// - The server is set up using Express and connects to a MongoDB database using Mongoose.
// - Various RESTful routes are defined to create, read, update, and delete products.
// - Proper error handling is included to provide meaningful responses in case of issues.
// - JSON parsing middleware is used to handle incoming requests with JSON payloads.
