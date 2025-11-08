console.log("🚀 Starting backend...");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // ✅ required to serve React build
const calculator = require("./build/Release/calculator.node");

const app = express();

// ✅ Middleware
app.use(cors()); // allow cross-origin requests (optional if frontend served here)
app.use(bodyParser.json());

// ✅ Serve React frontend (production build)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// ✅ API endpoint
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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));