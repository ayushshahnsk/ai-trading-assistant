from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class StockRequest(BaseModel):
    symbol: str

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/analyze")
def analyze_stock(req: StockRequest):
    symbol = req.symbol.upper()
    print("Received symbol:", symbol)

    return {
        "received_symbol": symbol,
        "status": "Symbol received successfullyy"
    }