# 🧠 AI Trading Assistant

An AI-powered full-stack trading assistant that fetches real-time stock data, computes technical indicators, and uses a local LLM (Gemma 3 via Ollama) to explain stock trends in simple language.

⚠️ This project is for **educational purposes only** and does **not** provide financial or investment advice.

---

## 🚀 Features

- 📈 Fetch real-time stock prices using `yfinance`
- 📊 Compute technical indicators:
  - RSI (Relative Strength Index)
  - 20-day Moving Average
- 📉 Display interactive price chart (last 60 days)
- 🧠 Generate AI explanations using **Gemma 3:4B** via **Ollama**
- 💾 Save last 20 analyses in backend memory
- ⚠️ Educational disclaimer for safe usage

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Recharts (for charts)

### Backend
- FastAPI
- Python
- yfinance
- ta (technical analysis)

### AI
- Ollama
- Gemma 3:4B (local LLM)

---

## 📂 Project Structure

ai-trading-assistant/
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ └── venv/
├── frontend/
│ ├── app/page.tsx
│ └── package.json
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd ai-trading-assistant

---
2. Backend Setup

cd backend
python -m venv venv

# Activate venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload

3. Install and Run Ollama

Install from: https://ollama.com

Pull model: ollama pull gemma3:4b


Run Ollama server: ollama serve

4. Frontend Setup

In new terminal:

cd frontend
npm install
npm run dev

5. Get History
GET /history
Returns last 20 stock analyses.

👨‍💻 Author

Ayush
Engineering Student | AI & Full-Stack Developer



# 🤖 AI Trading Assistant

An AI-powered trading assistant built with FastAPI, React, and Ollama for stock analysis and history tracking.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd ai-trading-assistant ```bash