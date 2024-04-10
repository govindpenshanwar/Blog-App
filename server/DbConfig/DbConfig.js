const mongoose = require('mongoose');
require("dotenv").config();
async function connect() {
    try {
        const mongoUri = process.env.MONGO_URI
        // 'mongodb://127.0.0.1:27017/BloggerDB'
        await mongoose.connect(mongoUri).then(() => {
            console.log("Db Connected");
        }).catch((err) => {
            console.error("Err connecting DB", err.message);
        });
    } catch (error) {
        console.error("Err connecting db => ", error);
    }
}

module.exports = connect;