const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const morgan = require("morgan");

// Handle async errors in readable way
require("express-async-errors");

// Database Connection
require("./mongo");

// Models
require("./model/Post");

//Middleware
app.use(bodyParser.json())
    .use(morgan())

//Routes
app.use("/posts", require("./routes/posts"));

// Error Generates If Any Route Is Not Found
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Routes Not Found");
    next(error);
});

//Error Handler
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message:error.message, // Give error information
        stack:error.stack // Give which function run and where error comes
    });
});

module.exports = app;