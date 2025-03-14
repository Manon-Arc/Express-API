const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    try {
        const db_url = process.env.DB_URL;
        if (!db_url) {
            throw new Error("DB_URL is not defined in .env file");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(db_url);

        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = dbConnect;
