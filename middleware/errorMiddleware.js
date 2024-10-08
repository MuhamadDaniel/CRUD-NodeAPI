//Custom Middleware

const errorMiddleware = (err,req,res,next) => {
    console.log("Error Middleware");
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message: error.message, stack: process.env.NODE_ENV === 'development' ? error.stack : null});
}

//export module to server2
module.exports = errorMiddleware;