// Environment variables
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();
const router = require("./app/routers");
const cors = require("cors");

// Allow access to DB
app.use(cors());

// Body parser
app.use(express.json());

// Routing
app.get('/', (_, res) => {
    res.redirect('/api/v1');
});
app.use('/api/v1', router);

// Server laucnh
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});