import React, { useState } from "react";

function App() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [op, setOp] = useState("add");
    const [result, setResult] = useState("");

    const handleCalculate = async () => {
        const res = await fetch("http://localhost:5000/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b), op }),
        });
        const data = await res.json();
        setResult(data.result);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🧮 C++ Calculator</h1>
            <input value={a} onChange={e => setA(e.target.value)} placeholder="First number" />
            <select value={op} onChange={e => setOp(e.target.value)}>
                <option value="add">+</option>
                <option value="subtract">−</option>
                <option value="multiply">×</option>
                <option value="divide">÷</option>
            </select>
            <input value={b} onChange={e => setB(e.target.value)} placeholder="Second number" />
            <button onClick={handleCalculate}>Calculate</button>
            <h2>Result: {result}</h2>
        </div>
    );
}

export default App;