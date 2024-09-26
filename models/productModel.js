const mongoose = require('mongoose');

// Define the product schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name"]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

//export Product 
module.exports = Product;
