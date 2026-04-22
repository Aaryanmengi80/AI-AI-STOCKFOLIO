from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    # API Keys
    GEMINI_API_KEY: str = "your_api_key_here"
    ALPHA_VANTAGE_API_KEY: str = "your_api_key_here"
    
    # App Settings
    APP_NAME: str = "AI Portfolio Rebalancer"
    DEBUG: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["*"]
    
    # Caching
    CACHE_EXPIRATION_SECONDS: int = 3600  # 1 hour
    
    model_config = SettingsConfigDict(env_file="backend/.env", extra="ignore")

settings = Settings()
