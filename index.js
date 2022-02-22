// Environment variables
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();
const router = require("./app/routers");
const cors = require("cors");
const sanitizer = require('sanitizer');

// Allow access to DB
app.use(cors());

// Body parser
app.use(express.json());
app.use( (req, res, next) => {
    if (req.body) {
        for (const prop in req.body) {
            req.body[prop] = sanitizer.escape(req.body[prop]);
        }
    }
    next();
});

// Routing
app.get('/', (_, res) => {
    res.redirect('/api/v1');
});
app.use('/api/v1', router);

// Server laucnh
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});