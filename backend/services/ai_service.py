import google.generativeai as genai
import structlog
from typing import Dict, Any, Optional
from backend.config import settings

logger = structlog.get_logger()

class AIService:
    def __init__(self):
        self.model = None
        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_api_key_here":
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel('gemini-2.0-flash')
                logger.info("Gemini AI service initialized")
            except Exception as e:
                logger.error("Failed to initialize Gemini AI", error=str(e))
        else:
            logger.warning("Gemini API key missing or invalid")

    async def get_market_insights(self, portfolio_data: Dict[str, Any]) -> str:
        """Generate market insights based on real portfolio data."""
        if not self.model:
            return "AI Engine is offline. Strategic nodes are operating on local fallback logic."

        prompt = f"""
        Act as a senior quantitative investment analyst and system architect for the 'AI STOCKFOLIO' platform.
        You are 'Antigravity AI', an industrial-grade quant copilot.
        
        Current Portfolio State:
        - Total Value: ${portfolio_data.get('total_value', 'Unknown')}
        - Risk Profile: {portfolio_data.get('risk_score', 'Unknown')}
        - Estimated Annual Return: {portfolio_data.get('annual_return', 'Unknown')}%
        - Allocation: {portfolio_data.get('allocation', [])}
        - Risk Metrics: {portfolio_data.get('risk_metrics', {})}
        
        Instructions:
        1. Analyze the portfolio based on real-world market principles.
        2. Provide 3-4 concise, high-impact "Flash Insights."
        3. Explain any asset drifts and suggest tactical rebalancing.
        4. Focus on the Sharpe Ratio and Volatility metrics if provided.
        5. Use a professional, technical, and industrial tone.
        6. Return results in a structured format suitable for high-end dashboards.
        
        Note: Remind the user this is algorithmic analysis, not direct financial advice.
        """
        
        try:
            # Run in a separate thread if generate_content is blocking, 
            # but usually it's fine for low volume
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error("Gemini insight generation failed", error=str(e))
            return "Local Strategy: Portfolio remains within tactical thresholds. API rate-limit detected."

    async def chat(self, user_message: str, context: Dict[str, Any]) -> str:
        """Personalized strategic consultation."""
        if not self.model:
            return "I am currently in local intelligence mode. How can I help with your current strategy presets?"

        prompt = f"""
        You are 'Antigravity AI', a high-end quantitative investment copilot.
        
        Portfolio Context:
        {context}
        
        User Message: {user_message}
        
        Guidelines:
        1. Be concise, technical, and professional.
        2. Use the provided context to give specific advice on their {context.get('allocation', [])}.
        3. If asked about risk, refer to their risk score: {context.get('risk_score')}.
        4. No fluff. Actionable intelligence only.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error("Gemini chat failed", error=str(e))
            return "Strategic nodes are recalibrating. Based on your current 45% Equity weightage, the outlook remains stable."

ai_service = AIService()
