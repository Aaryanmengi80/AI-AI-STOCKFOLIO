import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "active", "service": "AI Portfolio Rebalancer"}

def test_get_portfolio_status():
    response = client.get("/api/portfolio/status")
    assert response.status_code == 200
    data = response.json()
    assert "total_value" in data
    assert "allocation" in data
    assert isinstance(data["allocation"], list)

def test_ai_chat_validation():
    # Test min length validation
    response = client.post("/api/ai/chat", json={"message": ""})
    assert response.status_code == 422 # Unprocessable Entity
