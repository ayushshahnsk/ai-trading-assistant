from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yfinance as yf
import requests
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class StockRequest(BaseModel):
    symbol: str

# In-memory history (last 20 analyses)
analysis_history = []

@app.get("/")
def root():
    return {"message": "Backend is running"}

# Ollama helper (Gemma 3:4B)
def ask_ollama(prompt: str):
    url = "http://localhost:11434/api/generate"

    payload = {
        "model": "gemma3:4b",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(url, json=payload)
    result = response.json()

    return result["response"]

@app.post("/analyze")
def analyze_stock(req: StockRequest):
    symbol = req.symbol.upper()

    try:
        stock = yf.Ticker(symbol)

        # Get 3 months of data
        data = stock.history(period="3mo")

        if data.empty:
            return {
                "error": "No data found for this symbol"
            }

        # Latest close price
        latest_price = float(data["Close"].iloc[-1])

        # RSI (14)
        rsi_indicator = RSIIndicator(close=data["Close"], window=14)
        latest_rsi = float(rsi_indicator.rsi().iloc[-1])

        # 20-day Moving Average
        sma_indicator = SMAIndicator(close=data["Close"], window=20)
        latest_sma = float(sma_indicator.sma_indicator().iloc[-1])

        # Prepare chart data (last 60 days)
        chart_data = data.tail(60)[["Close"]].reset_index()

        chart_list = []
        for _, row in chart_data.iterrows():
            chart_list.append({
                "date": row["Date"].strftime("%Y-%m-%d"),
                "close": float(row["Close"])
            })

        # Build AI prompt
        prompt = f"""
You are an educational AI trading assistant.

Stock symbol: {symbol}
Current price: {round(latest_price, 2)}
RSI (14-day): {round(latest_rsi, 2)}
20-day Moving Average: {round(latest_sma, 2)}

Explain in beginner-friendly language:
1. What the current price means.
2. What RSI means and whether it is high, low, or neutral.
3. What it means if price is above or below the moving average.
4. Clearly say this is NOT financial advice.

Keep the explanation short and structured.
"""

        ai_text = ask_ollama(prompt)

        # Save to history
        analysis_history.append({
            "symbol": symbol,
            "price": round(latest_price, 2),
            "rsi": round(latest_rsi, 2),
            "sma": round(latest_sma, 2)
        })

        # Keep only last 20 records
        analysis_history[:] = analysis_history[-20:]

        return {
            "symbol": symbol,
            "latest_price": round(latest_price, 2),
            "rsi": round(latest_rsi, 2),
            "sma_20": round(latest_sma, 2),
            "chart_data": chart_list,
            "ai_explanation": ai_text
        }

    except Exception as e:
        print("ERROR:", e)
        return {
            "error": "Something went wrong while analyzing this stock"
        }

# New endpoint: Get analysis history
@app.get("/history")
def get_history():
    return analysis_history