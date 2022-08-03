
const express = require('express');
const http = require('http');
const connectDB = require("./db");
const app = express();
const router = require('./router/api');
const cors = require("cors");
require('dotenv').config()




//Global  middleware
app.use([express.json(), cors(), router,express.static('public')]);
// Global error handler
/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *@returns {Response}
 *
 */
app.use((err, req, res, next) => {
    const message = err.message ? err.message : 'Server Error Occurred';
    const status = err.status ? err.status : 500;
    return res.status(status).json({
        message,
    });
});


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/";
const DB_NAME = process.env.DB_DATABASE || "block";

connectDB(DB_URI + DB_NAME).then(() => {
    console.log('Connected to DB');
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(process.env)
    })
}).catch(e => {
    console.log(e);
});
