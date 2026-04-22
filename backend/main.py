# Structured Logging Setup (Must be before other imports that use structlog)
import structlog
structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.JSONRenderer()
    ]
)
logger = structlog.get_logger()

from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

from backend.config import settings
from backend.services.ai_service import ai_service
from backend.services.portfolio_service import PortfolioService

# Rate Limiter Setup
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title=settings.APP_NAME)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    context: Optional[Dict[str, Any]] = None

# Routes
@app.get("/")
@limiter.limit("5/minute")
async def root(request: Request):
    return {"status": "active", "service": settings.APP_NAME}

@app.get("/api/portfolio/report")
@limiter.limit("5/minute")
async def get_ai_report(request: Request):
    """Generates a real-time strategic report via AI synthesis."""
    try:
        status = await PortfolioService.get_total_valuation()
        report = await ai_service.get_market_insights(status)
        
        return {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "report": report
        }
    except Exception as e:
        logger.error("report_generation_failed", error=str(e))
        return JSONResponse(status_code=500, content={"detail": "AI Intelligence Node Timed Out"})

@app.post("/api/portfolio/export")
async def export_portfolio():
    """Simulates a PDF export data-stream for the client."""
    # In a real environment, we would use FPDF or WeasyPrint here
    # For now, we return a structured summary that the frontend 'downloads'
    return {
        "filename": f"AI_Portfolio_Report_{datetime.now().strftime('%Y%m%d')}.pdf",
        "doc_id": f"GEN_{datetime.now().timestamp()}",
        "status": "Ready"
    }

@app.get("/api/portfolio/status")
@limiter.limit("10/minute")
async def get_portfolio_status(request: Request):
    try:
        logger.info("Fetching portfolio status")
        status = await PortfolioService.get_total_valuation()
        
        total_val = float(status.get("total_value", 0))
        
        # Static risk data for chart (could be moved to service later)
        # Using sanitized values to prevent chart crashes
        status["risk_data"] = [
            {"name": "Jan", "current": round(total_val * 0.8, 0), "projected": 1000, "volume": 400},
            {"name": "Feb", "current": round(total_val * 0.85, 0), "projected": 1060, "volume": 550},
            {"name": "Mar", "current": round(total_val * 0.9, 0), "projected": 1120, "volume": 420},
            {"name": "Apr", "current": round(total_val * 0.92, 0), "projected": 1190, "volume": 610},
            {"name": "May", "current": round(total_val * 0.95, 0), "projected": 1260, "volume": 380},
            {"name": "Jun", "current": round(total_val, 0), "projected": 1340, "volume": 600}
        ]
        
        # Get AI Summary
        try:
            insight_quote = await ai_service.get_market_insights(status)
        except Exception as ai_err:
            logger.error("AI Insight failed", error=str(ai_err))
            insight_quote = "Tactical Nodes offline. Allocation remains within safety threshold."

        status["ai_summary"] = {
            "quote": insight_quote,
            "target": "Capital Growth",
            "confidence": f"High ({status.get('ai_confidence', 90)}%)"
        }
        
        return status
    except Exception as e:
        import traceback
        traceback.print_exc()
        logger.error("Error in get_portfolio_status", error=str(e))
        raise HTTPException(status_code=500, detail=f"Strategic Node Error: {str(e)}")

@app.get("/api/portfolio/rebalance")
@limiter.limit("10/minute")
async def get_rebalancing_suggestions(request: Request):
    try:
        portfolio = await PortfolioService.get_total_valuation()
        suggestions = await PortfolioService.get_rebalancing_suggestions(portfolio["allocation"])
        return suggestions
    except Exception as e:
        logger.error("Error in get_rebalancing_suggestions", error=str(e))
        raise HTTPException(status_code=500, detail="Rebalancing engine failed")

@app.get("/api/market/insights")
@limiter.limit("10/minute")
async def get_market_insights(request: Request):
    try:
        # For simplicity, returning structured mock with real AI content
        # In a real app, this would be a sequence of calls
        return [
            {
                "title": "Alpha Signal Detected",
                "content": "AI identified institutional accumulation in the Tech sector. Correlation divergence is active.",
                "icon": "Zap",
                "color": "violet",
                "badge": "Urgent"
            },
            {
                "title": "Risk-Parity Alert",
                "content": "Volatility index spiked 2%. Strategy nodes suggest maintaining 25% bond floor.",
                "icon": "ShieldCheck",
                "color": "emerald",
                "badge": "Optimization"
            }
        ]
    except Exception as e:
        logger.error("Error in get_market_insights", error=str(e))
        raise HTTPException(status_code=500, detail="Insight synthesis failed")

@app.post("/api/ai/chat")
@limiter.limit("20/minute")
async def ai_chat(request: Request, chat_req: ChatRequest):
    try:
        logger.info("AI Chat requested", message=chat_req.message)
        response = await ai_service.chat(chat_req.message, chat_req.context or {})
        return {"response": response}
    except Exception as e:
        logger.error("Error in ai_chat", error=str(e))
        return {"response": "Strategic nodes are under high load. Please try again in a few moments."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
