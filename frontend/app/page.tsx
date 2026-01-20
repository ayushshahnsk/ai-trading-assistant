"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [rsi, setRsi] = useState<number | null>(null);
  const [sma, setSma] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [aiText, setAiText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendSymbol = async () => {
    setLoading(true);
    setError("");
    setPrice(null);
    setRsi(null);
    setSma(null);
    setAiText("");
    setChartData([]);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol: symbol }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPrice(data.latest_price);
        setRsi(data.rsi);
        setSma(data.sma_20);
        setChartData(data.chart_data);
        setAiText(data.ai_explanation);
      }
    } catch (err) {
      setError("Failed to connect to backend or AI");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>Analyze a Stock</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Enter stock symbol (AAPL, TSLA)"
            value={symbol}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSymbol(e.target.value)
            }
          />
          <Button onClick={sendSymbol} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </CardContent>
      </Card>

      {/* Result Cards */}
      {price !== null && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Price</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              ${price}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>RSI (14)</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {rsi}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>20-Day MA</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {sma}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart Card */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Price Chart (Last 60 Days)</CardTitle>
          </CardHeader>
          <CardContent style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="#2563eb"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* AI Explanation Card */}
      {aiText && (
        <Card>
          <CardHeader>
            <CardTitle>🧠 AI Explanation</CardTitle>
          </CardHeader>
          <CardContent className="whitespace-pre-wrap leading-relaxed">
            {aiText}
          </CardContent>
        </Card>
      )}

      {/* Error Card */}
      {error && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="text-red-700">
            ❌ {error}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center pt-10">
        ⚠️ This tool is for educational purposes only.  
        It does NOT provide financial or investment advice.
      </div>
    </div>
  );
}
