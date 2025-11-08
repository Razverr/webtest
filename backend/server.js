const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const calculator = require("./build/Release/calculator.node");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve React build folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API route for calculation
app.post("/calculate", (req, res) => {
    const { a, b, op } = req.body;
    let result;

    switch (op) {
        case "add": result = calculator.add(a, b); break;
        case "subtract": result = calculator.subtract(a, b); break;
        case "multiply": result = calculator.multiply(a, b); break;
        case "divide": result = calculator.divide(a, b); break;
        default: return res.status(400).send("Invalid operator");
    }

    res.json({ result });
});

// Catch-all: serve React index.html for frontend routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));