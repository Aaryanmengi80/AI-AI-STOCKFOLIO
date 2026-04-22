# AI Stockfolio 📈🤖

> An industrial-grade, full-stack quantitative investment dashboard driven by autonomous generative AI and live market data.

**AI Stockfolio** is a modern, real-time financial architecture built to synthesize complex portfolio metrics and deliver institutional-level insights. Moving beyond traditional dashboards, this application leverages an integrated Large Language Model (Gemini 2.0 Flash) to act as an autonomous "quant copilot," automatically synthesizing market data into actionable risk-parity alerts and tactical rebalancing strategies.

---

## ✨ Core Features

*   **Live Market Data Integration:** Seamlessly aggregates live stock (Alpha Vantage) and cryptocurrency (CoinGecko) data streams using an asynchronous backend architecture with TTL caching mechanisms.
*   **Generative AI Synthesis:** Incorporates Google's Gemini LLM to process live portfolio states and generate real-time, non-deterministic strategic reports and market insights.
*   **Predictive Stress Simulation:** A dedicated Risk Lab allowing users to run complex resilience scenarios (e.g., Macro Market Crash, Interest Rate Spikes, Hyper-Inflation) against their current asset allocation. 
*   **Industrial Tech Aesthetic:** Built with a premium, sleek 'Dark Mode Only' glass-morphism aesthetic using Tailwind CSS and Framer Motion for incredibly smooth micro-interactions.
*   **Intelligent UI Architecture:** Includes functioning action modals, client-side dynamic generated file downloads (PDF/Text mock layers), system constraint overrides, and secure tokenized states.
*   **Self-Healing & Fallback Logic:** The backend is built to withstand downstream API rate limits or LLM timeouts without crashing the frontend, gracefully shifting to localized fallback intelligence data.

## 🛠️ Technology Stack

**Frontend (Client Layer)**
*   React 18 + Vite
*   Tailwind CSS (Custom Utility Configuration)
*   Lucide React (Iconography)
*   Framer Motion (Fluid Component Animation)
*   Recharts (Data Visualization)

**Backend (Strategic Nodes & Compute)**
*   Python FastAPI
*   Google GenAI SDK (Gemini)
*   Pydantic & Settings Management
*   SlowAPI (Rate Limiting)
*   Cachetools (In-Memory Request TTL)
*   Structlog (Structured JSON Logging)

## 🚀 Getting Started

### Prerequisites
*   Node.js (`v18+` recommended)
*   Python (`v3.10+` recommended)
*   API Keys: [Google Gemini](https://aistudio.google.com/) and [Alpha Vantage](https://www.alphavantage.co/)

### Local Installation

**1. Clone the Repository:**
```bash
git clone https://github.com/yourusername/ai-stockfolio.git
cd ai-stockfolio
```

**2. Setup the Backend Server:**
```bash
# Navigate to the backend
cd backend

# Create a virtual environment and install dependencies
python -m venv venv
source venv/Scripts/activate # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt

# Configure Environment Variables
# Create a .env file locally with:
# GEMINI_API_KEY="your_google_ai_key"
# ALPHA_VANTAGE_API_KEY="your_alpha_vantage_key"

# Run the FastAPI server
python -m uvicorn main:app --reload
```

**3. Setup the Frontend Client:**
```bash
# Open a new terminal tab and return to root directory
npm install

# Run the development server
npm run dev
```

Your industrial dashboard will now be live on `http://localhost:5173`.

---

## 🛡️ Architecture & Resilience

This platform embraces a strictly modular **Service Pattern** on the backend:
*   `FinanceService`: Handles batched external HTTP requests to market endpoints with a TTL cache to preserve rate limits.
*   `PortfolioService`: Manages business logic, asset drift mathematical evaluation, and valuation computation.
*   `AIService`: Dedicated layer parsing portfolio structures into specialized templated contexts for the Gemini engine.

If any external node fails (e.g., API limits), the system gracefully cascades to internal memory reserves, completely masking the failure from the end-user while still surfacing functional insights.

## 📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

