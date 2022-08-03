const mongoose = require('mongoose');
/**
 * @description: connect to mongodb
 * @param connectionStr
 * @returns {Promise<Mongoose>}
 */
const connectDB = (connectionStr) => {
    return mongoose.connect(connectionStr)
}

module.exports = connectDB;