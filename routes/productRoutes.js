// files ni handle routes 


const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const {createProductsController, getAllProductsController, getSingleProductController, updateProductController, deleteProductController} = require('../controller/productController');

// POST request to create a new product and insert it into the database
router.post('/products', createProductsController);

// GET request to retrieve all products from the database
router.get('/products', getAllProductsController);

// GET request to retrieve a single product by ID
router.get('/products/:id', getSingleProductController);

// PUT request to update an existing product by ID
router.put('/products/:id', updateProductController);

// DELETE request to delete a product by ID
router.delete('/products/:id', deleteProductController); 

//export router to server2.js
module.exports = router;