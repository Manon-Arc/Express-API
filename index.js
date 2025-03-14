const express = require('express');
const dbConnect = require('./db/connect');
const routes = require('./api/profiles/routes');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

dbConnect()
    .then(() => {

        app.use(express.json());
        app.use("/profiles", routes);
        app.use((req, res, next) => {
            res.status(404).json({ error: "Route not found" });
        });

        app.listen(port, () => {
            console.log(`✅ Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error("❌ Failed to connect to MongoDB", err);
        process.exit(1);
    });
