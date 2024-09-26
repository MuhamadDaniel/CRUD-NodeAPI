// 1. Import Required Libraries
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors'); //cross origin to connect front end to backend

//variable dotenv
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3002;

//date fns
const { format } = require('date-fns');
console.log(format(new Date(), 'yyyy MM dd\tHH:mm:ss'));

// Import the router from productRoutes exports 
const productRoutes = require('./routes/productRoutes');

// 2. Create an Express Application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

//use cors middleware
const corsOption = {
    origin: 'http://localhost:3002', //allow specified routes can use array if many
    optionSuccessStatus: 200 //allow certain routes to access to backend(your decision)
}
app.use(cors(corsOption));

// 5. Connect to MongoDB
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Database Connected Successfully!");
    
    // 6. Start the Express Server after a successful database connection
    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    });
})
.catch((error) => {
    console.error("Database connection error:", error);
});

// 7. Define Routes
app.use('/api', productRoutes);

// GET request for the root route
app.get('/', (req, res) => {
    res.send("Hello CRUD"); // Respond with a welcome message
});
//using Middleware 
app.use(errorMiddleware);

// GET request for the About page
app.get('/About', (req, res) => {
    res.send("This is about page"); // Respond with about page message
});



// Comments: 
// - The server is set up using Express and connects to a MongoDB database using Mongoose.
// - Various RESTful routes are defined to create, read, update, and delete products.
// - Proper error handling is included to provide meaningful responses in case of issues.
// - JSON parsing middleware is used to handle incoming requests with JSON payloads.
