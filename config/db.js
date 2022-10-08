const mongoose = require('mongoose');
const dotenv = require('dotenv')

const connectDB = async () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error('Not Connected'));
}

module.exports = connectDB;