console.log("🚀 Starting backend...");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ add this
const calculator = require("./build/Release/calculator.node");

const app = express();
app.use(cors()); // ✅ allow requests from React (localhost:3000)
app.use(bodyParser.json());

// Example endpoint: POST /calculate
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

app.listen(5000, () => console.log("✅ Server running on port 5000"));