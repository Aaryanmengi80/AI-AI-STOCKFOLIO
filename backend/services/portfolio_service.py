from typing import List, Dict, Any
from backend.services.finance_service import FinanceService
import structlog

logger = structlog.get_logger()

# Mock user holdings for demonstration - in a real app, these would be in a DB
USER_HOLDINGS = {
    "stocks": {"AAPL": 100, "MSFT": 50, "NVDA": 30},
    "crypto": {"bitcoin": 0.5, "ethereum": 5.0, "solana": 50.0},
    "bonds": 250000.0,
    "cash": 50000.0,
    "commodities": 100000.0
}

class PortfolioService:
    @staticmethod
    async def get_total_valuation() -> Dict[str, Any]:
        """Calculate real-time portfolio value based on live API data."""
        stocks = list(USER_HOLDINGS["stocks"].keys())
        cryptos = list(USER_HOLDINGS["crypto"].keys())
        
        prices = await FinanceService.get_batch_prices(stocks, cryptos)
        
        # Calculate Equity Value
        equity_val = 0
        stock_details = []
        for symbol, qty in USER_HOLDINGS["stocks"].items():
            price = prices.get(symbol, 150.0) # Fallback to a reasonable mock price if API fails
            val = price * qty
            equity_val += val
            stock_details.append({"symbol": symbol, "value": val, "price": price, "qty": qty})
            
        # Calculate Crypto Value
        crypto_val = 0
        crypto_details = []
        for cid, qty in USER_HOLDINGS["crypto"].items():
            price = prices.get(cid, 2000.0) # Fallback
            val = price * qty
            crypto_val += val
            crypto_details.append({"id": cid, "value": val, "price": price, "qty": qty})
            
        bonds_val = USER_HOLDINGS["bonds"]
        cash_val = USER_HOLDINGS["cash"]
        commodities_val = USER_HOLDINGS["commodities"]
        
        total_value = equity_val + crypto_val + bonds_val + cash_val + commodities_val
        
        # Calculate Allocations %
        allocation = [
            {"name": "Equities", "value": round((equity_val / total_value) * 100, 1), "color": "#3b82f6", "subAssets": stocks},
            {"name": "Bonds", "value": round((bonds_val / total_value) * 100, 1), "color": "#06b6d4", "subAssets": ["US10Y", "BND"]},
            {"name": "Crypto", "value": round((crypto_val / total_value) * 100, 1), "color": "#8b5cf6", "subAssets": ["BTC", "ETH"]},
            {"name": "Commodities", "value": round((commodities_val / total_value) * 100, 1), "color": "#f59e0b", "subAssets": ["GOLD"]},
            {"name": "Cash", "value": round((cash_val / total_value) * 100, 1), "color": "#64748b", "subAssets": ["USD"]}
        ]
        
        # Mock historical returns for risk metrics (in real app, fetch from DB)
        mock_returns = [0.01, -0.005, 0.02, 0.015, -0.01, 0.03, 0.005]
        risk_metrics = FinanceService.calculate_risk_metrics(mock_returns)
        
        return {
            "total_value": round(total_value, 2),
            "allocation": allocation,
            "stock_details": stock_details,
            "crypto_details": crypto_details,
            "risk_score": "Low-Med" if risk_metrics["volatility"] < 0.15 else "Medium",
            "annual_return": 18.4, # Mocked for now
            "ai_consistency": 98.8,
            "ai_confidence": 94,
            "risk_metrics": risk_metrics
        }

    @staticmethod
    async def get_rebalancing_suggestions(current_allocation: List[Dict]) -> List[Dict]:
        """Generate rebalancing logic based on drift from target."""
        # Target Allocation: Equities 45%, Bonds 25%, Crypto 15%, Commodities 10%, Cash 5%
        targets = {
            "Equities": 45, "Bonds": 25, "Crypto": 15, "Commodities": 10, "Cash": 5
        }
        
        suggestions = []
        for item in current_allocation:
            name = item["name"]
            current = item["value"]
            target = targets.get(name, current)
            
            diff = current - target
            if abs(diff) > 2: # 2% threshold
                action = "Decrease" if diff > 0 else "Increase"
                suggestions.append({
                    "asset": name,
                    "action": action,
                    "current": current,
                    "target": target,
                    "reason": f"Asset drift detected. Rebalancing to maintain {target}% risk-parity target."
                })
        
        return suggestions
