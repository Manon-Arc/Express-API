require('dotenv').config();

db = db.getSiblingDB('database');

db.test_collection.insertOne({ message: "DB initialized successfully!" });
