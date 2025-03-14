require('dotenv').config();

db = db.getSiblingDB('database');

db.createUser({
  user: process.env.DB_USER,
  pwd: process.env.DB_PWD,
  roles: [{ role: "readWrite", db: "database" }]
});

db.test_collection.insertOne({ message: "DB initialized successfully!" });
