import httpx
import asyncio
from typing import List, Dict, Any, Optional
from cachetools import TTLCache
import structlog
from backend.config import settings

logger = structlog.get_logger()

# In-memory cache: 100 items, expires according to settings
cache = TTLCache(maxsize=100, ttl=settings.CACHE_EXPIRATION_SECONDS)

class FinanceService:
    @staticmethod
    async def get_stock_price(symbol: str) -> Optional[float]:
        """Fetch real-time stock price from Alpha Vantage."""
        cache_key = f"stock_{symbol}"
        if cache_key in cache:
            return cache[cache_key]

        if not settings.ALPHA_VANTAGE_API_KEY or settings.ALPHA_VANTAGE_API_KEY == "your_api_key_here":
            logger.warning("Alpha Vantage API Key is missing or default. Skipping fetch.", symbol=symbol)
            return None

        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={settings.ALPHA_VANTAGE_API_KEY}"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=10.0)
                response.raise_for_status()
                data = response.json()
                
                # Check for rate limit or information messages
                if "Information" in data or "Note" in data:
                    msg = data.get("Information") or data.get("Note")
                    logger.warning("Alpha Vantage rate limit or info message received", symbol=symbol, msg=str(msg))
                    return None

                quote = data.get("Global Quote", {})
                price = quote.get("05. price")
                
                if price:
                    price_val = float(price)
                    cache[cache_key] = price_val
                    return price_val
                
                logger.warning("Alpha Vantage returned unexpected format", symbol=symbol)
                return None
        except Exception as e:
            logger.error("Failed to fetch stock price", symbol=symbol, error=str(e))
            return None

    @staticmethod
    async def get_crypto_price(coin_id: str) -> Optional[float]:
        """Fetch real-time crypto price from CoinGecko."""
        cache_key = f"crypto_{coin_id}"
        if cache_key in cache:
            return cache[cache_key]

        # Use CoinGecko Simple API (v3)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies=usd"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=10.0)
                response.raise_for_status()
                data = response.json()
                
                price = data.get(coin_id, {}).get("usd")
                if price is not None:
                    cache[cache_key] = float(price)
                    return float(price)
                
                logger.warning("CoinGecko returned incomplete data", coin_id=coin_id, response=str(data))
                return None
        except Exception as e:
            logger.error("Failed to fetch crypto price", coin_id=coin_id, error=str(e))
            return None

    @staticmethod
    async def get_batch_prices(symbols: List[str], crypto_ids: List[str]) -> Dict[str, float]:
        """Fetch multiple prices concurrently."""
        tasks = []
        for s in symbols:
            tasks.append(FinanceService.get_stock_price(s))
        for c in crypto_ids:
            tasks.append(FinanceService.get_crypto_price(c))
            
        results = await asyncio.gather(*tasks)
        
        price_map = {}
        all_keys = symbols + crypto_ids
        for i, res in enumerate(results):
            if res is not None:
                price_map[all_keys[i]] = res
        
        return price_map

    @staticmethod
    def calculate_risk_metrics(returns: List[float]) -> Dict[str, float]:
        """Calculate Sharpe Ratio and Volatility using pandas/numpy."""
        import pandas as pd
        import numpy as np
        
        if not returns or len(returns) < 2:
            return {"volatility": 0.0, "sharpe_ratio": 0.0}
            
        df = pd.Series(returns)
        volatility = df.std() * np.sqrt(252) # Annualized
        
        # Assume risk-free rate of 2%
        rf = 0.02
        sharpe_ratio = (df.mean() * 252 - rf) / volatility if volatility != 0 else 0
        
        return {
            "volatility": float(volatility),
            "sharpe_ratio": float(sharpe_ratio)
        }
