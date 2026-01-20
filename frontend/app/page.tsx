"use client";

import { useState } from "react";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState("");

  const sendSymbol = async () => {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: symbol }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h1>AI Trading Assistant - By Ayush</h1>

      <input
        placeholder="Enter stock symbol (AAPL, TSLA)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ padding: "10px", width: "100%", marginTop: "20px" }}
      />

      <button
        onClick={sendSymbol}
        style={{ padding: "10px", marginTop: "20px", width: "100%" }}
      >
        Send Symbol
      </button>

      <pre style={{ marginTop: "20px" }}>{result}</pre>
    </div>
  );
}
